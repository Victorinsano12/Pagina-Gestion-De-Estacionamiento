# leer PLACAS y crear una base de datos
# usando el servidor :http://docs.platerecognizer.com/
# Api : https://api.platerecognizer.com/v1/plate-reader

########### Dependencies ##############
import PySimpleGUI as sg
import cv2
import numpy as np
import sys
from sys import exit as exit
from datetime import datetime
import requests
import pandas as pd
from tkinter import messagebox
import csv

# Parametros
max_num_plate=10 # maximo numero de placas a almacenar en el fichero .csv


#funcion para leer la placa
def leer_placa(img):
    regions = ['gb', 'it'] # estos parametros depende del tipo de placa a leer segun el pais
    # Se abre el archivo de datos .csv
    with open(img, 'rb') as fp:
        #se pide la consulta al servidor
        response = requests.post(
            'https://api.platerecognizer.com/v1/plate-reader/',
            data=dict(regions=regions),  # Opcional
            # se sube la foto al servidor
            # Se le envia el token a la APi de la web http://docs.platerecognizer.com/
            # Aqui tienes que colocar tu propio Token suscribiendote a la pagina
            files=dict(upload=fp),
            headers={'Authorization': '94e38f36dce5e23afbea8d2b194b67a99a326215 '})
    return response.json() #retorna el json con los datos procesados

# funcion para validar y guardar la placa leida
def validar_placa(data, lista_placas,file,writer,max_num_plates, fechas):
    if data['results'] !=[]: #siempre que la imagen sea una placa
        #validar que no haya placas repetidas
        for result in data['results']:
            license_plate=result['plate']
        if len(lista_placas)>1: #para comenzar a verificar a partir de 1 placa
            if result['plate'] in lista_placas:
                validar=1 #filtra placas repetidas
            else:
                lista_placas.append(license_plate)
                validar=0 #asigna cero si no esta repetida
        else: # se agrega la primera placa
            lista_placas.append(license_plate)
            validar=0
        #verificar que haya menos de maximo numero de carros
        if len(lista_placas)>max_num_plates:
            validar=2
            lista_placas.pop() #elimina la ultima placa de la lista
        # se verifica si hay espacio en el parking o si esta repetida la placa antes de guardar
        guardar_placa(data, file, writer,validar)
        # Mensaje para saber que se leyo correctamente la placa
        messagebox.showinfo(message='PLACA leída "CORRECTAMENTE"')
        # Se lee la fecha y la hora
        date_=datetime.today().strftime('%x %X') #leer le fecha y hora
        fechas.append(date_.split(' '))
        #date,time_=date_[0], date_[1]

    else: # cuando la imagen no tenga una placa
        messagebox.showerror("ERROR", 'La imagen NO FUE RECONOCIDA')


#funcion para ir guardando en el archivo cada placa leida
def guardar_placa(data, file, writer,validar):
        for result in data['results']:
            if validar==0:
                writer.writerow(dict(date=datetime.today().strftime('%x %X'),
                         license_plate=result['plate'],
                         score=result['score'],
                         dscore=result['dscore'],
                         ))
            if validar==1:
                messagebox.showerror("ERROR", 'PLACA REPETIDA')
            if validar==2:
                messagebox.showerror("ERROR", 'MAS de ' + str(max_num_plate)+ ' AUTOS')



def tablero(frame, lista_placas,fechas):
    pizarra = np.zeros((frame.shape[0],300,3),dtype=np.uint8)
    # titulo
    cv2.putText(pizarra, "Plates readed :", (10, 20), cv2.FONT_HERSHEY_COMPLEX, .6, (255,0,255), 1, cv2.LINE_AA)
    #imprimir placas en el tablero
    y=25
    for placa,fecha in zip(lista_placas,fechas):
        y+=16
        cv2.putText(pizarra, placa, (10, y), cv2.FONT_HERSHEY_COMPLEX, .5, (255,254,255), 1, cv2.LINE_AA)
        cv2.putText(pizarra, fecha[0], (90, y), cv2.FONT_HERSHEY_COMPLEX, .5, (255,254,255), 1, cv2.LINE_AA)
        cv2.putText(pizarra, fecha[1], (190, y), cv2.FONT_HERSHEY_COMPLEX, .5, (255,254,255), 1, cv2.LINE_AA)
    #unir pizarra con imagen
    combinado= np.hstack([frame,pizarra])
    return combinado

"""
Demo program that read plate
"""

sg.ChangeLookAndFeel('Black')
# define the window layout
layout = [[sg.Text('Lector Placas EVC PARKING', size=(40, 1), justification='center', font='Helvetica 20')],
          [sg.Image(filename='', key='image')],
          [sg.Button('Read plate', size=(10, 1), font='Helvetica 14'),
           sg.Button('Map', size=(10, 1), font='Any 14'),
          sg.Button('Exit', size=(10, 1), font='Helvetica 14'),]]
# create the window and show it without the plot
window = sg.Window('Demo Application - Read Plate v1.1', layout,
                   location=(800,400))
######## ciclo para que la ventana se ejecute constantemente #######
file='save.csv' # nombre del archivo de datos previamente creado
# se bare el archivo para escritura
lista_placas=[]; fechas=[]
with open(file, 'w') as output:
    # se definen los campos del fichero
    fields = ['date', 'license_plate', 'score', 'dscore']
    writer = csv.DictWriter(output, fieldnames=fields)
    writer.writeheader()
    # se hace un ciclo para que la ventana se mantenga constantemente
    # ---===--- Event LOOP Read and display frames, operate the GUI --- #
    cap = cv2.VideoCapture(0)
    recording = True
    while True:
        event, values = window.Read(timeout=20)
        if event == 'Exit' or event is None:
            break
        elif event == 'Read plate':
            foto="temp.jpg" # nombre de la imagen temporal a guardar
            # se guarda la imagen capturada por el video
            cv2.imwrite(foto,frame)
            # se llama a la funcion leer placa
            data=leer_placa(foto)
            validar_placa(data,lista_placas,file,writer,max_num_plate, fechas) #recibe la fecha y hora
        elif event == 'Map':
            break
        if recording:
            ret, frame = cap.read()
            #Crear tablero de resultados
            frame_tablero=tablero(frame, lista_placas,fechas)
            imgbytes=cv2.imencode('.png', frame_tablero)[1].tobytes() #ditto
            window.FindElement('image').Update(data=imgbytes)
    window.close() #cerrar todo


exit()


