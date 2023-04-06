import { Component, OnInit } from '@angular/core';
import { ChatbotService, Message } from './shared/services/chatbot.service';
import { VoiceRecognitionService } from './shared/services/voice-recognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // title = 'food-ordering-app';
  // chatboxIsOpen = false;
  // toggleChatbox() {
  //   this.chatboxIsOpen = !this.chatboxIsOpen;
  // }

  //slackblitz

  messages: Message[] = [];
  value: string = '';
  chatFlag: boolean = false;

  constructor(public chatService: ChatbotService, public voiceService: VoiceRecognitionService) { }

  ngOnInit() {
      this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
    this.voiceService.init();
  }

openChatBot() {
  this.chatFlag=!this.chatFlag;
}

sendMessage() {
  this.chatService.getBotAnswer(this.value);
  this.value = '';
}

startService(){
  this.voiceService.start()
}

stopService(){
  this.voiceService.stop()
}


  }