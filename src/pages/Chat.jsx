import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('https://openrouter.ai/api/v1/chat/completions',
        {
          model: "openai/gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'HTTP-Referer': 'http://localhost:3000',
            'Content-Type': 'application/json'
          }
        }
      );

      const reply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { text: "Error from AI!", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Rama AI Chat 💬</h2>
      <div style={{
        border: "1px solid #ccc",
        height: 300,
        overflowY: "auto",
        padding: 10,
        marginBottom: 10
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p><b>{msg.sender}:</b> {msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div style={{ fontStyle: 'italic', color: 'gray' }}>
            <b>Rama AI:</b> typing...
          </div>
        )}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Rama AI..."
          style={{ width: "80%" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
