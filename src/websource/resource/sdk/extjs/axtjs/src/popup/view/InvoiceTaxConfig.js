/**
 * 세금 계산서 설정 팝업
 */
Ext.define('Axt.popup.view.InvoiceTaxConfig', { extend: 'Ext.window.Window',
    alias: 'widget.popup-invoice-tax-config',
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
    
    width: 900,
    height: 650,
    autoShow: true,
    resizable : false,
    layout: {
        type: 'border'
    },
    
    version : '1', // 1, 2, 3과같이 설정이 수정될때마다 version을 올려준다.
    
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
    	var defaultPrinter = {};
    	
    	// 프린터 정보 얻어오기
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
	   	    	
	   	    	var invoiceModel = ResourcePrint.getInvoiceModel(Const.InvoiceType.TAX, me.version);
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
            dockedItems : [
                me.createCenterForm()          
            ],
            fieldDefaults : {
            	useThousandSeparator : false,
            	labelWidth : 70, labelSeparator : '',labelAlign : 'right'
            },
            items: [
                {
                	xtype:'image', src:'/resource/sdk/extjs/axtjs/resources/img/invoice.png', x:0, y:0, width:'100%', height:490 // 596*398
                },
                
                {  xtype:'label', html:'세금 계산서', x:310, y:10, style:'font-size:30px !important; color:red;'  },
                
                // header(title)부분
                me.createNF('top_x', 125, 30, 6, 'b', 'x좌표 시작'), // x좌표 시작 
                me.createNF('top_y', 125, 30, 30, 'r', 'y좌표 시작'), // y좌표 시작

                // 직인 이미지 출력 여부
                {  xtype:'checkboxfield', name:'stamp_yn', x:200, y:31, inputValue:true, uncheckedValue:false, boxLabel  : '직인 출력' },
                // 영수/청구 마크 미표시
                {  xtype:'checkboxfield', name:'pay_gb_hidden_yn', x:200, y:55, inputValue:true, uncheckedValue:false, boxLabel  : '영수/청구 마크 미표시' },
//                me.createNF('stamp_yn', 125, 405, 31, 'b', '직인 출력'),
                
                // 공급자부분
                me.createNF('send_biz_x', 125, 30, 55, 'b', '공급자 x'), // 공급자 x좌표
                me.createNF('send_biz_no_y',    40, 105, 90,  'r'), me.createNF('send_biz_no_fs', 25, 150, 90, 'g'),    // 등록번호 
                me.createNF('send_biz_tel_no_x',    104, 200, 81,   'b', '전화'), me.createNF('send_biz_tel_no_y', 30, 308, 81, 'r') , me.createNF('send_biz_tel_no_fs', 25, 342, 81, 'g'), // 전화
                me.createNF('send_biz_fax_no_x',    104, 200, 104,  'b', '팩스'), me.createNF('send_biz_fax_no_y', 30, 308, 104, 'r'), me.createNF('send_biz_fax_no_fs', 25, 342, 104, 'g'),// 팩스
                me.createNF('send_biz_nm_y',    40, 105, 135, 'r'), me.createNF('send_biz_nm_fs', 25, 150, 135, 'g'),   // 상호 
                me.createNF('send_biz_owner_x', 40, 270, 135, 'b'), me.createNF('send_biz_owner_fs', 25, 315, 135, 'g'),// 성명 
                me.createNF('send_biz_addr_y',  40, 105, 180, 'r'), me.createNF('send_biz_addr_fs', 25, 150, 180, 'g'), // 주소 
                me.createNF('send_biz_addr_lh', 130, 195, 180, '', '주소 줄간격'), // 주소의 줄간격 
                
                me.createNF('send_biz_cond_y', 40, 105, 225, 'r'),  me.createNF('send_biz_cond_fs', 25, 150, 225, 'g'), // 업태 
                me.createNF('send_biz_types_x', 40, 253, 225, 'b'),      me.createNF('send_biz_types_fs', 25, 298, 225, 'g'),     // 종목 
                
                // 공급받는자부분
                me.createNF('recv_biz_x', 125, 405, 55, 'b', '공급받는자 x'),     // 등록번호 (공급자의 등록번호 x좌표부터의 거리
                me.createNF('recv_biz_tel_no_x',    104, 608, 81,   'b', '전화'),// 전화
                me.createNF('recv_biz_fax_no_x',    104, 608, 104,  'b', '팩스'),// 팩스
                me.createNF('recv_biz_owner_x', 40, 683, 135, 'b'), // 성명 (공급자의 성명 x좌표부터의 거리)
                me.createNF('recv_biz_types_x', 40, 667, 225, 'b'), // 종목 (공급자의 업종(종목) x좌표부터의 거리)
                
                // 금액
                me.createNF('money_year_x', 40, 5, 310, 'b'), me.createNF('money_month_x', 40, 50, 310, 'b'), me.createNF('money_day_x', 40, 95, 310, 'b'), me.createNF('money_empty_x', 25, 140, 310, 'b'),
                me.createNF('money_y', 40, 175, 310, 'r'), // 공급가액, 세액 부분의 y
                me.createNF('money_fs', 25, 220, 310, 'g'), // 공급가액, 세액 부분의 폰트크기
                me.createNF('money_subtotal_x', 40, 335, 310, 'b'), me.createNF('money_tax_x', 40, 520, 310, 'b'), me.createNF('money_box_width', 125, 570, 310,'', '금액 1칸의 넓이', 95),
                
                // 목록
                me.createNF('list_month_x', 40, 5, 370, 'b'), me.createNF('list_day_x', 40, 50, 370, 'b'), 
                me.createNF('list_item_cd_x', 40, 95, 370, 'b'), {  xtype:'label', html:'코드', x:100, y:345, style:'color:#FF9695;'}, //코드
                me.createNF('list_item_nm_x', 40, 140, 370, 'b'),                                          // 품목 
                me.createNF('list_y', 40, 185, 370, 'r'),                                                  // 목록의 첫시작 y좌표
                me.createNF('list_fs', 40, 230, 370, 'g'),                                                 // 목록의 폰트 크기
                me.createNF('list_unit_nm_x', 40, 375, 370, 'b'),                                          // 단위
                me.createNF('list_qty_x', 40, 430, 370, 'b'),                                              // 수량 
                me.createNF('list_price_x', 40, 495, 370, 'b'),                                            // 단가 
                me.createNF('list_subtotal_x', 40, 605, 370, 'b'),                                         // 공급가액 
                me.createNF('list_tax_x', 40, 700, 370, 'b'),                                              // 세액
                me.createNF('list_lh', 130, 5, 405, 'b', '품목 1라인당 폭', 95),                             // 품목 1라인당 폭 
                me.createNF('list_count', 130, 150, 405, 'b', '품목 출력 라인수', 95),                       // 품목 출력 라인수
                
                // 합계 금액부분 (합계 현금 수표 어음)
                me.createNF('total_amount_x', 40, 5, 460, 'b'), me.createNF('total_amount_y', 40, 50, 460, 'r'), me.createNF('total_amount_fs', 25, 95, 460, 'g'),
                me.createNF('bottom_recv_y', 200, 140, 460, 'r', '하단의 공급 받는자 y좌표', 150),
                
                // 영수/청구
                me.createNF('pay_gb_x',     200, 480, 410, 'b','영수/청구 마크 표시좌표', 150), 
                me.createNF('pay_gb1_y',     40, 635, 437, 'r'), 
                me.createNF('pay_gb2_y',     40, 635, 465, 'r'), 
                me.createNF('pay_gb_fs',     40, 685, 410, 'g'),
//                me.createNF('pay_gb_width',  40, 685, 410, 'black'),
//                me.createNF('pay_gb_height', 40, 730, 410, 'black'),
                
                {  xtype:'checkboxfield', name:'pay_gb_textview_yn', x:635, y:490, inputValue:true, uncheckedValue:false, boxLabel  : '영수/청구 글씨만 표시' },
                
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
    
    createCenterForm : function () {
    	var me = this;
    	return {  xtype:'panel', x:0, y:490, dock:'bottom',
		       items:[
		           {
		        	   xtype:'panel', layout:{type:'hbox'}, 
		        	   items:[
		        	          {
		        	        	  xtype:'form-panel', layout:{type:'hbox', align:'middle'}, border:0, flex:1,
		        	        	  fieldDefaults: { labelAlign : 'right', labelWidth : 55, labelSeparator : '', style:'margin-right:2px;' },
		        	        	  items:[
		        	        	         {  xtype:'numericfield', name:'barcode_x', flex:2, fieldLabel:'바코드', fieldCls:'invoice-blue'},
		        	        	         {  xtype:'numericfield', name:'barcode_y', flex:1 , fieldCls:'invoice-red'},
		        	        	         {  xtype:'numericfield', name:'barcode_width', flex:1, fieldCls:'invoice-black' },
		        	        	         {  xtype:'numericfield', name:'barcode_height', flex:1, fieldCls:'invoice-black'  },
		        	        	         {  xtype:'checkboxfield', name:'barcode_yn', flex:1.5, inputValue:true, uncheckedValue:false, boxLabel  : '코드 출력' },
		        	        	         {  xtype:'label', flex:6.5, text:' (가로, 세로, 넓이, 높이)', style :'margin-left:10px;color:red;'}
		        	        	  ]
		        	          },
		        	    ]
		           },
		           {
		        	   xtype:'panel', layout:{type:'hbox'}, 
		        	   items:[
		        	          {
		        	        	  xtype:'form-panel', layout:{type:'hbox', align:'middle'}, border:0, flex:1,
		        	        	  fieldDefaults: { labelAlign : 'right', labelWidth : 55, labelSeparator : '', style:'margin-right:2px;' },
		        	        	  items:[
		        	        	         {  xtype:'numericfield', name:'advertisement_x', flex:2, fieldLabel:'광고문구', fieldCls:'invoice-blue'},
		        	        	         {  xtype:'numericfield', name:'advertisement_y', flex:1, fieldCls:'invoice-red' },
		        	        	         {  xtype:'numericfield', name:'advertisement_fs', flex:1, fieldCls:'invoice-green' },
		        	        	         {  xtype:'textfield', name:'advertisement_content', flex:9 },
		        	        	  ]
		        	          },
		        	    ]
		           },
		           {
		        	   xtype:'panel', layout:{type:'hbox'}, 
		        	   defaults : {fieldDefaults: { labelAlign : 'right', labelWidth : 55, labelSeparator : '', style:'margin-right:2px;' }},
		        	   items:[
		        	          {
		        	        	  xtype:'form-panel', layout:{type:'hbox'}, border:0, flex:1,
		        	        	  items:[
		        	        	         {  xtype:'numericfield', name:'page_count_x', flex:2, fieldLabel:'페이지수', fieldCls:'invoice-blue'},
		        	        	         {  xtype:'numericfield', name:'page_count_y', flex:1 , fieldCls:'invoice-red'},
		        	        	         {  xtype:'numericfield', name:'page_count_fs', flex:1 , fieldCls:'invoice-green'},
		        	        	         {  xtype:'label', flex:9, text:' ', style :'margin-left:10px;color:red;'}
		        	        	  ]
		        	          }
		        	    ]
		           }
		       ]
		    }
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
                	handler: me.resetAction, scope : me, style:'margin-top:425px;'
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
    		width        : 280,
	 		name         : 'printer_name',
	 		editable     : false,
	 		autoSelect   : true
//	 		lookupValue  : []
	 	});
    	
    	items.push({	
    		fieldLabel   : '용지',
    		xtype        : 'lookupfield',
    		labelWidth   : 50,
    		width        : 260,
    		name         : 'paper_type',
    		editable     : false,
    		autoSelect   : true,
//    		selectedIndex:1,
    		lookupValue  : [
				[Const.PaperType.A4_NORMAL, '일반 순면지 A4 (일반)'],
				[Const.PaperType.A5_DOUBLE, '일반 양식지 A5*2']
    		]
    	});
    	
    	/*
    	items.push({	
    		xtype        : 'hiddenfield',
    		name         : 'printer_dpi',
    		value        : PrinterUtils.Dpi.NORMAL
    	});
    	
    	items.push({	
    		xtype        : 'hiddenfield',
    		name         : 'paper_width',
    		value        : PrinterUtils.Paper.A4.WIDTH 
    	});
    	
    	items.push({	
    		xtype        : 'hiddenfield',
    		name         : 'paper_height',
    		value        : PrinterUtils.Paper.A4.HEIGHT 
    	});
    	*/
    	
    	items.push({	
    		xtype        : 'label',
    		width        : 260,
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
    	var invoiceType = Const.InvoiceType.TAX;
    	var toolbarForm  = me.down('[name=toolbarForm]');
    	var centerForm  = me.down('[name=centerPanel]');
    	
    	var invoiceModel = me.invoiceModel;
    	var toolbarValues = toolbarForm.getForm().getValues();
    	invoiceModel.set('paper_type',   toolbarValues.paper_type);
    	invoiceModel.set('printer_name', toolbarValues.printer_name);
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
    			
    			// 프린터 정보 얻어오기
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
    		    		var invoiceModel = ResourcePrint.createInvoiceModel(Const.InvoiceType.TAX);
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