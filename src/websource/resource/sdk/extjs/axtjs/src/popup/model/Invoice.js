/**
 * Invoice 팝업 설정 Main
 */
Ext.define('Axt.popup.model.Invoice', { extend:'Ext.data.Model', 
    fields:[
        {name: 'invoice_type',      type: 'string' }, // 프린터 id Const.InvoiceType
        {name: 'version',           type: 'string' }, // 설정 버전
        {name: 'printer_name',      type: 'string' }, // 프린터 이름 (컴퓨터에서 읽어온 프린터 목록중 선택 저장
        {name: 'printer_dpi',       type: 'int'    }, // 프린터 dpi
        {name: 'paper_type',        type: 'string' }, // 명세서 용지 Const.PaperType
        {name: 'paper_width',       type: 'int'    }, // 명세서 용지 width
        {name: 'paper_height',      type: 'int'    }, // 명세서 용지 height
        {name: 'coordinates',       type: 'object' }  // 출력 좌표정보
    ]
});
