import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  conversation = new Subject<Message[]>();
  
  messageMap:any = {
    "Hi": "Hello",
    "Who are you": "My name is Agular Bot",
    "What is Angular": "Angular is the best framework ever",
    "order pizza": "Delivery or Takeaway?",
    "delivery": "Pizza Type?",
    "5 pepper": "Pizza Size?",
    "regular": "Should i Place order now?",
    "yes": "Order placed successfully.Thank you!",
    "default": "I can't understand. Can you please repeat"
  }

  private endpoint = 'https://your-chatbot-api-endpoint.com';

  constructor(private http: HttpClient) {}

  // sendMessage(message: string): Observable<any> {
  //   const body = {
  //     queryInput: {
  //       text: {
  //         text: message,
  //         languageCode: 'en-US'
  //       }
  //     }
  //   };

  //   return this.http.post(`${this.endpoint}/v1/projects/your-project-id/agent/sessions/your-session-id:detectIntent`, body);
  // }

  // sendMessage(message: string): Observable<any> {
  //   const body = { message };
  //   return this.http.post(`${this.endpoint}/chat`, body);
  // }

  sendMessage(message: string): Observable<string> {
    // Simulate the chatbot response
    const response = `You said: "${message}" - I'm a chatbot!`;
    return of(response);
  }

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}
