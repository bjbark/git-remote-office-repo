/**
 * 택배송장 설정 팝업 (CJ용)
 */
Ext.define('Axt.popup.view.InvoiceDeliveryConfig', { extend: 'Ext.window.Window',
    alias: 'widget.popup-invoice-delivery-config',
//    id : 'popup-invoice-config',
    
    requires : [
	 	'Axt.form.Layout',
	 	'Axt.form.Search',
	 	'Axt.grid.Panel',
	 	'Ext.draw.Component'
	],
    closable: true,
	modal: true,
//    owner: undefined, // 팝업 호출 창에서 호출한 객체로 설정 한다.  
//    popup: undefined,
    
    width: 940,
    height: 600,
    autoShow: true,
    resizable : false,
    layout: {
        type: 'border'
    },
    
    version : '4', // 1, 2, 3과같이 설정이 수정될때마다 version을 올려준다.
    
    initComponent: function(){
        var me = this;
        me.dockedItems = [me.createToolbar()];
    	me.items = [ me.createCenter(), me.createEast() ];
    	me.callParent([arguments]);
    	
    	PluginInit.initialize({
    		callback:function() {
    			me.initData();
    		}
    	});
    },
    
    initData : function () {
    	var me = this;
    	var toolbarForm      = me.down('[name=toolbarForm]');
    	var centerForm       = me.down('[name=centerPanel]');
    	var printerNameField = toolbarForm.down('[name=printer_name]');
    	var defaultPrinter;
    	// 1. 프린터 정보 가져오기
		PrinterPlugin.getPrinterList({
	    	callback:function(success, printerList, msg){
	   	    	
	        	var printerNameArray = [];
	   	    	for(var i=0; i<printerList.length; i++) {
	   	    		var printer = printerList[i];
	   	    		if(printer.isDefault) {
	   	    			defaultPrinter = printer;
	   	    		}
	   	    		printerNameArray.push([printer.name, printer.name]);
	   	    	}
	   	    	
    	         // applet으로 가져온 프린터 정보를 setting
	   	    	printerNameField.setLookupValue(printerNameArray);
	   	    	
	   	    	// deliveryCode는 SaleCheckPrintPopup.js와같은 설정에서 전달받는다
	    		var deliveryCode = me.popup.deliveryCode;
	    		var centerForm = me.down('[name=centerPanel]');
	    		var invoiceModel = ResourcePrint.getInvoiceModel(deliveryCode, me.version);
	    		
	    		if(invoiceModel) { // 설정된 거래명세서 정보가 있는경우만 
	    			me.invoiceModel = invoiceModel;
	    			if(Ext.isEmpty(invoiceModel.data.printer_name)) {
	    				invoiceModel.set('printer_name', defaultPrinter.name);
	    			}
	    			// 상단툴바의 set
	    			toolbarForm.getForm().setValues(invoiceModel.data);
	    			// 하단 form의 좌표정보 set
	    			centerForm.getForm().setValues(invoiceModel.data.coordinates); // 하단의 form정보
	    		}
	        }
	    });
    },
    
    createCenter : function () {
        var me = this;
        return {
//        	title: 'West Region is collapsible',
            region:'center',
            xtype: 'form',
            name : 'centerPanel',
            margins: '5 0 0 5',
//            width: 400,
//            collapsible: true,   // make collapsible
//            id: 'center-region-container',
            layout: 'absolute',
            fieldDefaults : {
            	useThousandSeparator : false,
            	labelWidth : 70, labelSeparator : '',labelAlign : 'right'
            },
            items: [
                {  xtype:'label', html:'', x:500, y:0},
                {
                	xtype:'image', src:'/resource/sdk/extjs/axtjs/resources/img/delivery.png', x:0, y:50, width:'100%', height:440 // 596*398
                },
                
                {  xtype:'label', html:'', x:310, y:10, style:'font-size:30px; color:red;'  },
                
                // x/y 좌표 시작
                me.createNF('top_x', 125, 0, 2, 'b', 'x좌표 시작'), // x좌표 시작 
                me.createNF('top_y', 125, 0, 27, 'r', 'y좌표 시작'), // y좌표 시작
            
             // !!! 좌측 고객용 시작 //
                // 운송장번호
                me.createNF('l_taekbae_no_x',    105, 150, 25,   'b', '운송장 번호'), me.createNF('l_taekbae_no_y', 30, 256, 25, 'r') , me.createNF('l_taekbae_no_fs', 30, 287, 25, 'g'),

                // TML바코드
                me.createNF('l_taekbae_tml_barcode_x',    105, 10, 56,   'b', 'TML바코드'), me.createNF('l_taekbae_tml_barcode_y', 30, 116, 56, 'r'),
                me.createNF('l_taekbae_tml_barcode_width', 30, 147, 56, 'black'),me.createNF('l_taekbae_tml_barcode_height', 30, 178, 56, 'black'),
                // TML코드
                me.createNF('l_taekbae_tml_x',    105, 210, 56,   'b', 'TML코드'), me.createNF('l_taekbae_tml_y', 30, 316, 56, 'r'),
                me.createNF('l_taekbae_tml_fs', 30, 347, 56, 'g'),
                me.createNF('l_taekbae_tml2_x',    105, 210, 79,   'b', ' '), me.createNF('l_taekbae_tml2_y', 30, 316, 79, 'r'),
                me.createNF('l_taekbae_tml2_fs', 30, 347, 79, 'g'),
                me.createNF('l_taekbae_tml3_x',    105, 210, 102,   'b', ' '), me.createNF('l_taekbae_tml3_y', 30, 316, 102, 'r'),
                me.createNF('l_taekbae_tml3_fs', 30, 347, 102, 'g'),

                // 받는분
                me.createNF('l_rcv_biz_addr_x',    85, 5, 166,   'b', '주소', 50), me.createNF('l_rcv_biz_addr_y', 30, 91, 166, 'r'),
                me.createNF('l_rcv_biz_addr_fs', 30, 122, 166, 'g'), me.createNF('l_rcv_biz_addr_lh', 30, 153, 166, 'black'),
                me.createNF('l_rcv_biz_nm_x',    85, 5, 189,   'b', '이름', 50), me.createNF('l_rcv_biz_nm_y', 30, 91, 189, 'r'),
                me.createNF('l_rcv_biz_nm_fs', 30, 122, 189, 'g'),
                me.createNF('l_rcv_tel_no_x',    85, 171, 166,   'b', '전화', 50), me.createNF('l_rcv_tel_no_y', 30, 257, 166, 'r'),
                me.createNF('l_rcv_tel_no_fs', 30, 288, 166, 'g'),
                me.createNF('l_rcv_tel_hp_x',    85, 171, 189,   'b', '핸드폰', 50), me.createNF('l_rcv_tel_hp_y', 30, 257, 189, 'r'),
                me.createNF('l_rcv_tel_hp_fs', 30, 288, 189, 'g'),
                // 보내는분
                me.createNF('l_snd_biz_addr_x',    85, 5, 241,   'b', '주소', 50), me.createNF('l_snd_biz_addr_y', 30, 91, 241, 'r'),
                me.createNF('l_snd_biz_addr_fs', 30, 122, 241, 'g'), me.createNF('l_snd_biz_addr_lh', 30, 153, 241, 'black'),
                me.createNF('l_snd_biz_nm_x',    85, 5, 264,   'b', '이름', 50), me.createNF('l_snd_biz_nm_y', 30, 91, 264, 'r'),
                me.createNF('l_snd_biz_nm_fs', 30, 122, 264, 'g'),
                me.createNF('l_snd_tel_no_x',    85, 171, 241,   'b', '전화', 50), me.createNF('l_snd_tel_no_y', 30, 257, 241, 'r'),
                me.createNF('l_snd_tel_no_fs', 30, 288, 241, 'g'),

                // 운임
                me.createNF('l_fare_type_x',    126, 200, 320,   'b', '운임', 90), me.createNF('l_fare_type_y', 30, 327, 320, 'r'),
                me.createNF('l_fare_type_fs', 30, 358, 320, 'g'),
                // 박스수량 (박스구분 + 수량) 
                me.createNF('l_box_count_x',    126, 200, 343,   'b', '박스수량', 90), me.createNF('l_box_count_y', 30, 327, 343, 'r'),
                me.createNF('l_box_count_fs', 30, 358, 343, 'g'),
                // 매출번호
                me.createNF('l_inv_no_x',    126, 200, 366,   'b', '매출번호', 90), me.createNF('l_inv_no_y', 30, 327, 366, 'r'),
                me.createNF('l_inv_no_fs', 30, 358, 366, 'g'),
                
                // 품명
                me.createNF('l_item_nm_x',    85, 5, 320,   'b', '품명', 50), me.createNF('l_item_nm_y', 30, 91, 320, 'r'),
                me.createNF('l_item_nm_fs', 30, 122, 320, 'g'),

                // 품명
                me.createNF('l_qty_x',    85, 5, 343,   'b', '상품수량', 50), me.createNF('l_qty_y', 30, 91, 343, 'r'),
                me.createNF('l_qty_fs', 30, 122, 343, 'g'),
                
                // 바코드 (운송장)
                me.createNF('l_taekbae_no_barcode_x',    85, 0, 450,   'b', '바코드',50), me.createNF('l_taekbae_no_barcode_y', 30, 86, 450, 'r') , 
                me.createNF('l_taekbae_no_barcode_width', 30, 117, 450, 'black'), me.createNF('l_taekbae_no_barcode_height', 30, 148, 450, 'black'),
                
            // !!! 좌측 고객용 끝 // 
 
                
            // !!! 우측 택배회사용 상단 시작 !! //
                // 운송장번호
                me.createNF('ru_taekbae_no_x',    105, 425, 25,   'b', '운송장 번호'), me.createNF('ru_taekbae_no_y', 30, 531, 25, 'r') , me.createNF('ru_taekbae_no_fs', 30, 562, 25, 'g'),
                
                // 받는분
                me.createNF('ru_rcv_biz_addr_x',  85, 445, 56, 'b', '주소', 50),   me.createNF('ru_rcv_biz_addr_y', 30, 531, 56, 'r'),
                me.createNF('ru_rcv_biz_addr_fs', 30, 562, 56, 'g'),              me.createNF('ru_rcv_biz_addr_lh', 30, 593, 56, 'black'),
                me.createNF('ru_rcv_biz_nm_x',    85, 445, 79, 'b', '이름', 50),   me.createNF('ru_rcv_biz_nm_y', 30, 531, 79, 'r'),
                me.createNF('ru_rcv_biz_nm_fs',   30, 562, 79, 'g'),
                me.createNF('ru_rcv_tel_no_x',    85, 611, 56, 'b', '전화', 50),   me.createNF('ru_rcv_tel_no_y', 30, 697, 56, 'r'),
                me.createNF('ru_rcv_tel_no_fs',   30, 728, 56, 'g'),
                me.createNF('ru_rcv_tel_hp_x',    85, 611, 79, 'b', '핸드폰', 50), me.createNF('ru_rcv_tel_hp_y', 30, 697, 79, 'r'),
                me.createNF('ru_rcv_tel_hp_fs',   30, 728, 79, 'g'),
                // 품명
                me.createNF('ru_item_nm_x',    30, 470, 140, 'b'), me.createNF('ru_item_nm_y', 30, 501, 140, 'r'),
                me.createNF('ru_item_nm_fs',   30, 532, 140, 'g'),   
                // 운임
                me.createNF('ru_fare_type_x',  30, 700, 140, 'b'), me.createNF('ru_fare_type_y', 30, 731, 140, 'r'),
                me.createNF('ru_fare_type_fs', 30, 762, 140, 'g'),
            // !!! 우측 택배회사용 상단 끝 !! //
                
                
            // !!! 우측 택배회사용 하단 시작 !! //
                // 받는분
                me.createNF('rd_rcv_biz_addr_x',  85, 385, 200, 'b', '주소', 50),   me.createNF('rd_rcv_biz_addr_y', 30, 471, 200, 'r'),
                me.createNF('rd_rcv_biz_addr_fs', 30, 502, 200, 'g'),              me.createNF('rd_rcv_biz_addr_lh', 30, 533, 200, 'black'),
                me.createNF('rd_rcv_biz_nm_x',    85, 385, 223, 'b', '이름', 50),   me.createNF('rd_rcv_biz_nm_y', 30, 471, 223, 'r'),
                me.createNF('rd_rcv_biz_nm_fs',   30, 502, 223, 'g'),
                me.createNF('rd_rcv_tel_no_x',    85, 551, 200, 'b', '전화', 50),   me.createNF('rd_rcv_tel_no_y', 30, 637, 200, 'r'),
                me.createNF('rd_rcv_tel_no_fs',   30, 668, 200, 'g'),
                me.createNF('rd_rcv_tel_hp_x',    85, 551, 223, 'b', '핸드폰', 50), me.createNF('rd_rcv_tel_hp_y', 30, 637, 223, 'r'),
                me.createNF('rd_rcv_tel_hp_fs',   30, 668, 223, 'g'),
                // 보내는분
                me.createNF('rd_snd_biz_addr_x',  85, 385, 310, 'b', '주소', 50),   me.createNF('rd_snd_biz_addr_y', 30, 471, 310, 'r'),
                me.createNF('rd_snd_biz_addr_fs', 30, 502, 310, 'g'),              me.createNF('rd_snd_biz_addr_lh', 30, 533, 310, 'black'),
                me.createNF('rd_snd_biz_nm_x',    85, 385, 333, 'b', '이름', 50),   me.createNF('rd_snd_biz_nm_y', 30, 471, 333, 'r'),
                me.createNF('rd_snd_biz_nm_fs',   30, 502, 333, 'g'),
                me.createNF('rd_snd_tel_no_x',    85, 551, 310, 'b', '전화', 50),   me.createNF('rd_snd_tel_no_y', 30, 637, 310, 'r'),
                me.createNF('rd_snd_tel_no_fs',   30, 668, 310, 'g'),
                
//                // 집하점명
//                me.createNF('rd_taekbae_bid_x',    126, 400, 404,   'b', '집하점명', 90), me.createNF('rd_taekbae_bid_y', 30, 527, 404, 'r'),
//                me.createNF('rd_taekbae_bid_fs', 30, 558, 404, 'g'),
                
                // 품목 정보
                me.createNF('rd_item_nm_x',    126, 400, 384,   'b', '품목 정보', 90), me.createNF('rd_item_nm_y', 30, 527, 384, 'r'),
                me.createNF('rd_item_nm_fs', 30, 558, 384, 'g'),

                // 매출 날짜
                me.createNF('rd_inv_dt_x',    126, 400, 407,   'b', '매출날짜', 90), me.createNF('rd_inv_dt_y', 30, 527, 407, 'r'),
                me.createNF('rd_inv_dt_fs', 30, 558, 407, 'g'),

                // 배송지 주소약칭
                me.createNF('rd_taekbae_znm_x',    126, 400, 430,   'b', '배송지주소약칭', 90), me.createNF('rd_taekbae_znm_y', 30, 527, 430, 'r'),
                me.createNF('rd_taekbae_znm_fs', 30, 558, 430, 'g'),
                
                // 배송대리점명
                me.createNF('rd_taekbae_did_x',    126, 400, 453,   'b', '배송대리점명', 90), me.createNF('rd_taekbae_did_y', 30, 527, 453, 'r'),
                me.createNF('rd_taekbae_did_fs', 30, 558, 453, 'g'),
                
                // 집배사원
                me.createNF('rd_taekbae_pnm_x',    126, 400, 476,   'b', '배달사원', 90), me.createNF('rd_taekbae_pnm_y', 30, 527, 476, 'r'),
                me.createNF('rd_taekbae_pnm_fs', 30, 558, 476, 'g'),
                
                // 운임
                me.createNF('rd_fare_type_x',    85, 621, 404,   'b', '운임', 50), me.createNF('rd_fare_type_y', 30, 707, 404, 'r'),
                me.createNF('rd_fare_type_fs', 30, 738, 404, 'g'),
                // 박스수량 (박스구분 + 수량) 
                me.createNF('rd_box_count_x',    85, 621, 427,   'b', '박스수량', 50), me.createNF('rd_box_count_y', 30, 707, 427, 'r'),
                me.createNF('rd_box_count_fs', 30, 738, 427, 'g'),
                
                // 바코드 (운송장)
                me.createNF('rd_taekbae_no_barcode_x',    85, 620, 450,   'b', '바코드',50), me.createNF('rd_taekbae_no_barcode_y', 30, 706, 450, 'r') , 
                me.createNF('rd_taekbae_no_barcode_width', 30, 737, 450, 'black'), me.createNF('rd_taekbae_no_barcode_height', 30, 768, 450, 'black')
            // !!! 우측 택배회사용 하단 끝 !! //
            ]
        };
    },
    
    createNF : function (name, width, x, y, fontColor, label, labelWidth){
    	var color;
    	if(fontColor === 'b') {
    		color = 'blue';
    	} else if(fontColor === 'r') {
    		color = 'red';
    	} else if(fontColor === 'g') {
    		color = 'green';
    	} else {
    		color = 'black'
    	}
    	
    	if(labelWidth === undefined) {
    		labelWidth = 70;
    	}
    	
    	return {
    		xtype:'numericfield', name:name, width:width, x: x, y: y, fieldCls:'invoice-'+color,
    		fieldLabel:label, labelWidth : labelWidth
    	};
    }, 
    
    createEast : function () {
    	var me = this;
        return {
//        	title: 'West Region is collapsible',
            region:'east',
            xtype: 'panel',
            margins: '5 3 5 3',
            width: 100,
            layout : {
            	type : 'vbox', align:'center', pack:'start'
            },
//            bodyStyle: 'background:#ffc;',
            baseCls: 'x-plain',
            items : [
                {  xtype : 'button', text : '저 장', width:90, height:'50px', renderTo: Ext.getBody(),
                   handler: me.saveAction, scope : me
                },
                {  xtype : 'button', text : '닫 기', width:90, height:'50px', renderTo: Ext.getBody(),
                   handler: me.closeAction, scope : me, style:'margin-top:5px;'
                },
                {  xtype : 'button', text : '초기화', width:90, height:'50px', renderTo: Ext.getBody(),
                	handler: me.resetAction, scope : me, style:'margin-top:375px;'
                }
            ]
//            collapsible: true,   // make collapsible
//            id: 'center-region-container',
//            layout: 'fit'
        };
    },

    /**
     * 상단 툴바
     * @return {}
     */
    createToolbar: function(){
    	var me = this;
    	var items = [];
    	items.push({	
    		fieldLabel   : '프린터',
	 		xtype        : 'lookupfield',
	 		labelWidth   : 50,
    		width        : 260,
	 		name         : 'printer_name',
	 		editable     : false,
	 		autoSelect   : true
//	 		lookupValue  : []
	 	});
    	
    	items.push({
    		xtype:'numericfield', name:'paper_width', width:110, labelWidth:70 ,
    		value : PrinterUtils.Paper.DELIVERY_100_200.WIDTH,
    		fieldLabel:'용지 가로길이'
    	});
    	
    	items.push({
    		xtype:'numericfield', name:'paper_height', width:110, labelWidth:70,
    		value : PrinterUtils.Paper.DELIVERY_100_200.HEIGHT,
    		fieldLabel:'용지 세로길이'
    	});
    	
    	items.push({
    		xtype:'numericfield', name:'printer_dpi', width:100, labelWidth:60 ,
    		value : PrinterUtils.Dpi.SEWOO_LK_B30,
    		fieldLabel:'프린터 dpi'
    	});
    	
//    	items.push({
//    		xtype:'hiddenfield', name:'paper_type', value:Const.PaperType.DELIVERY_100_200
//    	});
    	
    	items.push({	
    		xtype        : 'label',
    		width        : 260,
    		style        : 'margin-left:4px;',
    		html         : '* 용지의 설정 단위는 mm 입니다.',
    		cls          : 'text-warn'
    	});
    	
    	var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
               {   xtype:'form', name:'toolbarForm', layout : {type:'hbox'},bodyStyle: 'background: none', border:0,
                   items:items
               }
            ]
        });
        return toolbar;
    },
    
    /**
     * 저장
     */
    saveAction : function () {
    	var me = this;
    	var deliveryCode = me.popup.deliveryCode;
    	var invoiceType  = deliveryCode;
    	var toolbarForm  = me.down('[name=toolbarForm]');
    	var centerForm  = me.down('[name=centerPanel]');
    	
    	var invoiceModel = me.invoiceModel;
    	var toolbarValues = toolbarForm.getForm().getValues();
    	invoiceModel.set('printer_name', toolbarValues.printer_name);
    	invoiceModel.set('printer_dpi',  toolbarValues.printer_dpi);
    	invoiceModel.set('paper_width',  toolbarValues.paper_width);
    	invoiceModel.set('paper_height', toolbarValues.paper_height);
    	invoiceModel.set('version',      me.version);
    	
    	var coordinatesModel = ResourcePrint.createInvoiceCoordinateModel(invoiceType, centerForm.getForm().getValues());
    	invoiceModel.set('coordinates',  coordinatesModel.data);
    	invoiceModel.setDirty();
    	
    	var invoiceStore = ResourcePrint.getInvoiceStore();
		invoiceStore.add(invoiceModel);
    	
    	invoiceStore.sync({
			callback : function (batch, options) {
				var operation = batch.operations[0];
				var success = operation.wasSuccessful();
				var records = operation.getRecords();
				Ext.Msg.alert('', '저장 되었습니다.');
				me.close();
			}
		});
    },
    
    /**
     * 닫기
     */
    closeAction : function () {
    	var me = this;
    	me.close();
    },
    
    /**
     * 설정 초기화
     */
    resetAction : function () {
    	var me = this;
    	var toolbarForm      = me.down('[name=toolbarForm]');
    	var centerForm       = me.down('[name=centerPanel]');
    	var printerNameField = toolbarForm.down('[name=printer_name]');
    	var defaultPrinter;

    	Ext.Msg.confirm('확인', '설정을 초기화 하시겠습니까?', function(value){
    		if(value === 'yes' ) {
    			
    	    	var toolbarForm      = me.down('[name=toolbarForm]');
    	    	var centerForm       = me.down('[name=centerPanel]');
    	    	var printerNameField = toolbarForm.down('[name=printer_name]');
    	    	var defaultPrinter;
    	    	
    			PrinterPlugin.getPrinterList({
    		    	callback:function(success, printerList, msg){
    		    		
    		        	var printerNameArray = [];
    		   	    	for(var i=0; i<printerList.length; i++) {
    		   	    		var printer = printerList[i];
    		   	    		if(printer.isDefault) {
    		   	    			defaultPrinter = printer;
    		   	    		}
    		   	    		printerNameArray.push([printer.name, printer.name]);
    		   	    	}
    		   	    	
    	    	         // applet으로 가져온 프린터 정보를 setting
    		   	    	printerNameField.setLookupValue(printerNameArray);
    		   	    	
    		   	    	
    		   	    	// 이전 저장된 모델
    		   	    	var previousSaveModel = me.invoiceModel;
    		   	    	// 새로 생성된 모델
    		   	    	// deliveryCode는 SaleCheckPrintPopup.js와같은 설정에서 전달받는다
    		   	    	var deliveryCode = me.popup.deliveryCode;
    		    		var invoiceModel = ResourcePrint.createInvoiceModel(deliveryCode);
    		    		// 이전모델에 새로생성된 모델의 정보를 결합
	    	    		for(var property in invoiceModel.data) {
	    	    			if(property) {
	    	    				previousSaveModel.set(property, invoiceModel.get(property));
	    	    			}
	    	    		}
	    	    		
		    			if(Ext.isEmpty(previousSaveModel.data.printer_name)) {
		    				previousSaveModel.set('printer_name', defaultPrinter.name);
		    			}
		    			// 상단툴바의 set
		    			toolbarForm.getForm().setValues(previousSaveModel.data);
		    			// 하단 form의 좌표정보 set
		    			centerForm.getForm().setValues(previousSaveModel.data.coordinates); // 하단의 form정보
    		        }
    		    });
    	    	
    		}
    	});
    }

});