import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
    ],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    @Input('datasource') datasource: any[] = [];

    @Input('colums') columns: any;

    @Output('onClickAction') onClickAction = new EventEmitter<any>();

    handleClickAction(action: 'detail' | 'edit' | 'delete', data: any) {
        this.onClickAction.emit({ action: action, data: data });
    }
}
