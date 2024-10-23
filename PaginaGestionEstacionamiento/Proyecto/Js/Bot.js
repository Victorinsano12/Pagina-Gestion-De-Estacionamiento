
        document.getElementById('sendButton').addEventListener('click', function() {
            const userInput = document.getElementById('userInput').value;
            const chatbox = document.getElementById('chatbox');

            if (userInput) {
                const userMessage = document.createElement('p');
                userMessage.innerHTML = `<strong>Tú:</strong> ${userInput}`;
                chatbox.appendChild(userMessage);
                document.getElementById('userInput').value = '';

                // Simulación de respuesta del bot
                const botResponse = document.createElement('p');
                botResponse.innerHTML = `<strong>Bot:</strong> Gracias por tu mensaje. ¿En qué más puedo ayudarte?`;
                chatbox.appendChild(botResponse);

                // Scroll to bottom
                chatbox.scrollTop = chatbox.scrollHeight;
            }
        });
 