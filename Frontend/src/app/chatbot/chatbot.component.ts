import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatbotService, Message } from '../shared/services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  
  conversation: string[] = [];
  inputText: string = '';
  message: string = '';
  isOpen = true;
  @Input() chatboxIsOpen: boolean = true;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  chatbotResponse: string = '';
  messages: Message[] = [];
  value: string = '';

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.chatbotService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }

  // sendMessage() {
  //   // this.conversation.push('User: ' + this.inputText);
  //   // this.chatbotService.getResponse(this.inputText).subscribe(response => {
  //   //   this.conversation.push('Chatbot: ' + response);
  //   // });
  //   // this.inputText = '';
  //   this.chatbotService.sendMessage(this.message).subscribe(response => {
  //     console.log(response);
  //     this.chatbotResponse = response;
  //     // Process the chatbot response here
  //   });
  //   this.message = ''
  // }

  // closeChat() {
  //   this.chatboxIsOpen = false;
  // }

  closeChat() {
    this.close.emit();
  }

  // slackblitz
  sendMessage() {
    this.chatbotService.getBotAnswer(this.value);
    this.value = '';
  }
}
