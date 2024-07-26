import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-validator-message',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './validator-message.component.html',
    styleUrls: ['./validator-message.component.scss']
})
export class ValidatorMessageComponent {

    @Input('show') show: boolean = false;

    @Input('caption') caption: string = "";
}
