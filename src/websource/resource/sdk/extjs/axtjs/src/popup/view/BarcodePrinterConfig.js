/**
 * 바코드 라벨프린터 설정
 */
Ext.define('Axt.popup.view.BarcodePrinterConfig', { extend: 'Ext.window.Window',
    alias: 'widget.popup-barcode-printer-config',
    requires : [
//	 	'Axt.form.Layout',
//	 	'Axt.form.Search',
//	 	'Axt.grid.Panel',
	 	'Ext.draw.Component'
	],
    closable: true,
	modal: true,
//    owner: undefined, // 팝업 호출 창에서 호출한 객체로 설정 한다.  
//    popup: undefined,
    
    width: 950,
    height: 700,
    autoShow: true,
    resizable : false,
    layout: {
        type: 'border'
    },
    
    version : '1', // 1, 2, 3과같이 설정이 수정될때마다 version을 올려준다.
    
    initComponent: function(){
        var me = this;
//        me.items = [  ];
        me.callParent([arguments]);
        
        var store = ResourceBarcodePrint.getStore();//Ext.create('Axt.popup.store.BarcodePrinter');
    	store.load();
    	me.store = store;
        
    	PluginInit.initialize({
    		callback:function() {
    			
    			SerialPlugin.getPortNames({
					callback:function(success, portArray){
						
			        	var portNameArray = [];
			   	    	for(var i=0; i<portArray.length; i++) {
			   	    		var portName = portArray[i];
			   	    		portNameArray.push([portName, portName]);
			   	    	}
			   	    	
			   	    	// 좌측 그리드와 우측 좌표설정 화면 그리기
			   	    	me.add(me.createWest(portNameArray, store));
			   	    	me.add(me.createCenter());
			   	    	
			   	    	// 좌측 그리드에서 현재 사용중인 설정정보 선택 이벤트 발생 시킨다.
			   	    	var grid = me.down('[name=leftGrid]');
			   	    	var idx = 0;
			   	    	var useYnIndex = -1;
			   	    	me.store.each(function(rec){
			   	    		if(rec.get('use_yn') === true) {
			   	    			useYnIndex = idx;
			   	    		}
			   	    		idx++;
			   	    	});
			   	    	if(useYnIndex > -1) {
			   	    		grid.getSelectionModel().select(useYnIndex); 
			   	    	}
					}
				})
    		}
    	});
    },
    
    createCenter : function () {
        var me = this;
        var baseHeight = 0;
        
        var center = {
            region:'center',
            xtype: 'form',
            name : 'centerPanel',
            margins: '5 0 0 5',
            layout: 'absolute',
            fieldDefaults : {
            	useThousandSeparator : false,
            	labelWidth : 70, labelSeparator : '',labelAlign : 'right'
            },
            items: [
            ]
        };
        
        for(var i=0; i<2; i++) {
        	var topBaseHeight = i * 260;
        	var nameTail = i===0?'':'2';
        // TEXT 설정           
        	center.items.push(
	        	{  xtype : 'label', html : '#'+ (i+1) +'. Text설정 (설정 단위는 mm)', width : 380, x : 30, y : 20 + topBaseHeight, cls : 'text-warn'  },
	
	            // 품명
	            me.createNF('item_nm_x'+nameTail,    105, 0, 40 + topBaseHeight,   'b', '품명'), 
	            me.createNF('item_nm_y'+nameTail, 30, 106, 40 + topBaseHeight, 'r'),
	            me.createFsLf('item_nm_fs'+nameTail, 140, 40 + topBaseHeight),
	            me.createRotateLf('item_nm_rotation'+nameTail, 240, 40 + topBaseHeight),
	            {  xtype:'textfield', name:'item_nm_title'+nameTail, width:100, x: 310, y: 40 + topBaseHeight, fieldLabel:'제목', labelWidth:30 },
	            
	            // 규격
	            me.createNF('item_sp_x'+nameTail,    105, 0, 65 + topBaseHeight,   'b', '규격'), 
	            me.createNF('item_sp_y'+nameTail, 30, 106, 65 + topBaseHeight, 'r'),
	            me.createFsLf('item_sp_fs'+nameTail, 140, 65 + topBaseHeight),
	            me.createRotateLf('item_sp_rotation'+nameTail, 240, 65 + topBaseHeight),
	            {  xtype:'textfield', name:'item_sp_title'+nameTail, width:100, x: 310, y: 65 + topBaseHeight, fieldLabel:'제목', labelWidth:30 },
	            
	            // 소비자가
	            me.createNF('sobi_price_x'+nameTail, 105, 0, 90 + topBaseHeight,   'b', '소비자가'), 
	            me.createNF('sobi_price_y'+nameTail, 30, 106, 90 + topBaseHeight, 'r'),
	            me.createFsLf('sobi_price_fs'+nameTail, 140, 90 + topBaseHeight),
	            me.createRotateLf('sobi_price_rotation'+nameTail, 240, 90 + topBaseHeight),
	            {  xtype:'textfield', name:'sobi_price_title'+nameTail, width:100, x: 310, y: 90 + topBaseHeight, fieldLabel:'제목', labelWidth:30  },
	            
	            // 판매가
	            me.createNF('sale_price_x'+nameTail, 105, 0, 115 + topBaseHeight,   'b', '판매가'), 
	            me.createNF('sale_price_y'+nameTail, 30, 106, 115 + topBaseHeight, 'r'),
	            me.createFsLf('sale_price_fs'+nameTail, 140, 115 + topBaseHeight),
	            me.createRotateLf('sale_price_rotation'+nameTail, 240, 115 + topBaseHeight),
	            {  xtype:'textfield', name:'sale_price_title'+nameTail, width:100, x: 310, y: 115 + topBaseHeight, fieldLabel:'제목', labelWidth:30  },
	           	
	           	// 품목코드
	           	me.createNF('item_cd_x'+nameTail, 105, 0, 140 + topBaseHeight,   'b', '품목코드'), 
	           	me.createNF('item_cd_y'+nameTail, 30, 106, 140 + topBaseHeight, 'r'),
	           	me.createFsLf('item_cd_fs'+nameTail, 140, 140 + topBaseHeight),
	           	me.createRotateLf('item_cd_rotation'+nameTail, 240, 140 + topBaseHeight),
	           	{  xtype:'textfield', name:'item_cd_title'+nameTail, width:100, x: 310, y: 140 + topBaseHeight, fieldLabel:'제목', labelWidth:30  },
	           	
	           	// 태그코드
	           	me.createNF('tagcode_x'+nameTail, 105, 0, 165 + topBaseHeight,   'b', '태그코드'), 
	           	me.createNF('tagcode_y'+nameTail, 30, 106, 165 + topBaseHeight, 'r'),
	           	me.createFsLf('tagcode_fs'+nameTail, 140, 165 + topBaseHeight),
	           	me.createRotateLf('tagcode_rotation'+nameTail, 240, 165 + topBaseHeight),
	           	{  xtype:'textfield', name:'tagcode_title'+nameTail, width:100, x: 310, y: 165 + topBaseHeight, fieldLabel:'제목', labelWidth:30  },
	        	
	            
	        // 바코드
	            {  xtype : 'label', html : '#'+ (i+1) +'. 바코드 설정', width : 400, x : 30, y : 200 + topBaseHeight, cls : 'text-warn'  },
	            me.createNF('barcode_x'+nameTail,    105, 0, 220+ topBaseHeight,   'b', '바코드'), 
	            me.createNF('barcode_y'+nameTail, 30, 106, 220+ topBaseHeight, 'r') , 
	            me.createNF('barcode_h'+nameTail, 80, 135, 220+ topBaseHeight, 'g', '높이',40),
	            {	xtype        : 'lookupfield', fieldLabel   : 'Type',
	        		x : 225, y:220 + topBaseHeight, labelWidth : 32, width : 130,
	        		name : 'barcode_type'+nameTail, editable : false, autoSelect   : true, labelAlign:'right', selectedIndex : 0,
	        		lookupValue  : [  ['128', 'CODE128'] /* ['128A', 'CODE128A'],['128B', 'CODE128B'],['128C', 'CODE128C']*/ ]
	        	},
	        	me.createRotateLf('barcode_rotation'+nameTail, 50, 245 + topBaseHeight), // 바코드 회전
	        	me.createNF('barcode_narrow'+nameTail,     80, 135, 245 + topBaseHeight,   'black', 'narrow', 40), // 바코드 narrow 넓이
	        	me.createNF('barcode_wide'+nameTail,       80, 220, 245 + topBaseHeight,   'black', 'wide', 35), // 바코드 wide 넓이
	        	{	xtype        : 'lookupfield', fieldLabel   : '바코드문자', 
	        		name : 'barcode_text_visible'+nameTail,
	        		x : 300, y:245 + topBaseHeight, labelWidth : 56, width : 114, 
	        		editable : false, autoSelect : true, labelAlign:'right', selectedIndex : 0,
	        		lookupValue : [   [true, '표시'],[false, '숨김']  ]
	        	}
	        ); // end array push
        } // end for
        
        
        
        
        
        var bottomBaseHeight = 240;
        center.items.push(
        
        // 프린트속도
    		{	xtype        : 'lookupfield', fieldLabel   : '프린트속도',
        		x            : 120, y:370 + bottomBaseHeight, labelWidth : 52, width : 96,
        		name         : 'barcode_speed', editable : false, autoSelect : true, labelAlign:'right', selectedIndex : 0,
        		lookupValue  : [  [1, '1'],[2, '2'],[3, '3'],[4, '4'],[5, '5']  ]
        	},
        // 프린트 밀도 
        	{	xtype : 'lookupfield', fieldLabel : '프린트밀도',
        		x : 230, y:370 + bottomBaseHeight, labelWidth : 52, width : 96,
        		name : 'barcode_density', editable : false, autoSelect : true, labelAlign:'right', selectedIndex : 0,
        		lookupValue  : [
        		    [0, '0'],[1, '1'],[2, '2'],[3, '3'],[4, '4'],[5, '5'],[6, '6'],[7, '7'],[8, '8'],
        		    [9, '9'],[10, '10'],[11, '11'],[12, '12'],[13, '13'],[14, '14'],[15, '15']
        		]
        	},
            	
    	// 라벨 간격
        	{   xtype:'numericfield', name:'paper_gap', width:110, labelWidth:70, labelAlign:'right',
        		x : 102, y:394 + bottomBaseHeight, value : 3, fieldLabel:'라벨 간격'  },
    	// 정방향 역방향
    		{	
        		xtype        : 'lookupfield', fieldLabel   : '프린트방향',
        		x :227, y:394 + bottomBaseHeight, labelWidth   : 55, width : 140,
        		name         : 'direction', editable     : false, autoSelect   : true, labelAlign:'right',
        		lookupValue  : [  [1, '정방향'], [0, '역방향'] ], selectedIndex : 0
        	},		
        	
        // x/y 좌표 시
        	{  xtype : 'label', html : '* 프린트속도 : 초당 출력 inch<br/>&nbsp;&nbsp; 프린트밀도 : 숫자가 높을수록 진하게 출력',
        	   width : 400, x : 200, y : 303 + bottomBaseHeight, cls : 'text-warn' },
        	{  xtype : 'label', html : '<span style="font-size:11px !important;">라벨<br/>사이즈</span>',
        	   width : 260, x : 22, y : 304 + bottomBaseHeight },
        	{  xtype : 'label', html : '<span style="font-size:11px !important;color:blue;">가로길이 mm</span>',
        	   width : 260, x : 22, y : 364 + bottomBaseHeight },
        	{  xtype : 'label', html : '<span style="font-size:11px !important;color:red;">세로길이 mm</span>',
        	   width : 260, x : 102, y : 315 + bottomBaseHeight },
            me.createNF('top_x',90, 120, 345 + bottomBaseHeight, 'b', 'x좌표 시작',  52), // x좌표 시작 
            me.createNF('top_y',90, 230, 345 + bottomBaseHeight, 'r', 'y좌표 시작', 52), // y좌표 시작
            me.createNF('paper_width', 35, 20, 339 + bottomBaseHeight, 'b'),  
            me.createNF('paper_height', 35, 61, 311 + bottomBaseHeight, 'r')	
            
        );
        
        return center;
    },

    /**
     * @priavte
     * 폰트사이즈 lookupfield를 생성하는 공통
     */
    createFsLf : function (name, x, y) {
    	return {	
    		fieldLabel   : '폰트크기',
    		xtype        : 'lookupfield',
    		x :x, y:y,
    		labelWidth   : 42,
    		width        : 90,
    		name         : name,
    		editable     : false,
    		autoSelect   : true,
    		labelAlign:'right',
    		lookupValue  : [[1, '1'],[2, '2'],[3, '3']],
    		selectedIndex : 0
    	};
    },
    
    /**
     * @private
     * rotate(회전) 공통 lookupfield
     */
    createRotateLf : function (name, x, y) {
    	return {	
    		fieldLabel   : '회전',
    		xtype        : 'lookupfield',
    		x :x, y:y,
    		labelWidth   : 22,
    		width        : 70,
    		name         : name,
    		editable     : false,
    		autoSelect   : true,
    		labelAlign:'right',
    		lookupValue  : [[0, '0'],[90, '90'],[180, '180'],[270, '270']],
    		selectedIndex : 0
    	};
    },
    
    /**
     * @private
     * numericfield생성 공통
     */
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
    
    /**
     * 좌측의 그리드
     */
    createWest : function (portNameArray, store) {
    	var me = this;
    	return {
            region:'west',
            xtype: 'panel',
            margins: '5 3 5 3',
            baseCls: 'x-plain',
            layout:{
        		type:'vbox', align:'center', pack:'center'
        	},
        	width: 500,
            items : [
                {
                	xtype:'grid-panel',
                	name:'leftGrid',
                	selModel 	: { selType: 'checkboxmodel', mode : 'SINGLE' },
//                	selModel: {selType:'cellmodel'},
                	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
                	store: store,
            	    columns: [
						{ text: '순서',   dataIndex: 'seq',     align:'center',flex:0.2, editable:false },
						{ text: '설정명', dataIndex: 'setting_name',     align:'left',flex:0.8,
					      style: 'text-align:center',
						  editor: {  xtype:'textfield' }
						},
						
            	        { text: '프린터모델', dataIndex: 'printer_name',  align:'left', flex:0.4,
						  style: 'text-align:center',
            	          xtype : 'lookupcolumn', lookupValue:[
            	              [Const.BarcodePrinterType.ZEBRA_ZM400, Const.BarcodePrinterType.ZEBRA_ZM400],                                  
            	              [Const.BarcodePrinterType.TSC_TTP243,  Const.BarcodePrinterType.TSC_TTP243]                                  
            	          ],
            	          readOnly    : false ,
            	        },
            	        { text: '포트',      dataIndex: 'port_name',     align:'center', flex:0.3, 
	        	            xtype : 'lookupcolumn', lookupValue:portNameArray, 
	        	            readOnly    : false ,allowBlank   : false
            	        },
            	        { text: '연결속도',   dataIndex: 'baud_rate',     align:'center', flex:0.3,
            	        	xtype : 'lookupcolumn', lookupValue:[
                         	    [2400, '2400'],[4800, '4800'],[9600, '9600'],[19200, '19200']
                        	],
                        	readOnly    : false
            	        }
            	    ],
            	    listeners : {
            	    	selectionchange : function ( grid, selected, eOpts ) {
            	    		if(selected.length>0) {
            	    			var centerForm = me.down('[name=centerPanel]');
            	    			centerForm.getForm().setValues(selected[0].data);
            	    		}
            	    	}
            	    },
            	    flex:6,
            	    width:'100%',
            	    paging : {
	       		    	 xtype : 'grid-paging',
	       		    	pagingButton : false,
	       			     items: [
	       			 	    '->', '-', 
	       			 	    
		       			 	{
	            	        	iconCls:Const.INSERT.icon, text:'설정 추가', handler:function(){
	            	        		var model = Ext.create('Axt.popup.model.BarcodePrinter');
	            	        		model.set('seq', me.store.getCount()+1);
	            	        		me.store.add(model);
	            	        		var grid = me.down('[name=leftGrid]');
	            	        		if(me.store.getCount()===1) {
	            	        			grid.getSelectionModel().select(me.store.getCount()-1); 
	            	        		}
	            	        	}
	            	        },
	            	        {
	            	        	iconCls:Const.DELETE.icon, text:'설정 삭제', handler:function(){
	            	        		var grid = me.down('[name=leftGrid]');
	            	        		var selection = grid.getSelectionModel().getSelection();
	            	        		if(selection.length > 0 ) {
	            	        			me.store.remove(selection[0]);
	            	        			
	            	        			var idx = 0;
	            	        			me.store.each(function(rec){
	            	        				rec.set('seq', ++idx);
	            	        			});
	            	        			
	            	        			var grid = me.down('[name=leftGrid]');
	            			   	    	grid.getSelectionModel().select(me.store.getCount()-1); 
	            	        		} else {
	            	        			Ext.Msg.alert('', '그리드를 선택해 주십시오.');
	            	        		}
	            	        	}
	            	        },
	            	        
	            	        {  iconCls:Const.MODIFY.icon, text : '저 장', 
	                            handler: me.saveAction, scope : me
	                        },
	                        {  iconCls:Const.CANCEL.icon, text : '닫 기', 
	                           handler: me.closeAction, scope : me
	                        }
	       			 	    
	       		        ]
	       		    }
                }
            ]
        };
    },
    
    /**
     * 저장
     */
    saveAction : function () {
    	var me = this;
    	//store.load();
    	var store = me.store;
    	if(store.getCount() === 0) {
    		Ext.Msg.alert('', '설정 추가를 해주십시오.');
    		return false;
    	}
    	
    	// 유효성 체크
    	var isPortNameValid = true;
    	store.each(function(rec){
    		if(Ext.isEmpty(rec.get('port_name'))) {
    			isPortNameValid = false;
    		}
    	});
    	
    	if(!isPortNameValid) {
    		Ext.Msg.alert('', '포트를 선택해 주십시오.');
    		return false;
    	}
    	
    	var centerForm = me.down('[name=centerPanel]');
    	// 현재 선택된 그리드의 row를 가져온다.
    	var grid = me.down('[name=leftGrid]');
    	var selection = grid.getSelectionModel().getSelection();
		if(selection.length > 0 ) {
			var model = store.findRecord('seq', selection[0].get('seq'));
			
			store.each(function(rec){
				rec.set('use_yn', false);
			});
			
			model.set('use_yn', true);
			
			// 현재 grid의 선택된 row (model)에 use_yn을 true로 기타 좌표값들도 넣어준다.
			var formValues = centerForm.getValues();
			for(var key in formValues) {
				model.set(key, formValues[key]);
			}
			
			var modifyLength = store.getNewRecords().length + store.getUpdatedRecords().length + store.getRemovedRecords().length;
			if(modifyLength>0 ) {
				store.sync({
					callback:function(){
						Ext.Msg.alert('', '저장 되었습니다.');
						store.load();
					}
				});
			} else {
				Ext.Msg.alert('', '변경된 설정이 없습니다.');
			}
		}
    	
    },
    
    /**
     * 닫기
     */
    closeAction : function () {
    	var me = this;
    	me.close();
    }
    
});









///**
//* @private
//* print방향 combo box 이벤트
//*/
//changePrintDirection : function (combobox, newValue, oldValue, eOpts ) {
//	var me = this;
//	if(newValue === 1) {// 정방향
//		var centerPanel = me.down('[name=centerPanel]');
//		if(centerPanel){
//			centerPanel.remove(Ext.getCmp('directionText'));
//			centerPanel.add(Ext.create('Ext.draw.Text', {
//				height: 350,
//				id : 'directionText',
//				x			 : 185,
//				y            : 455,
//				degrees: 0,
//				text: 'T E X T',
//				textStyle: {'font-size': '18px'}
//			}));
//		}
//	    
//	} else { // 역방향
//		var centerPanel = me.down('[name=centerPanel]');
//		if(centerPanel){
//			centerPanel.remove(Ext.getCmp('directionText'));
//			centerPanel.add(Ext.create('Ext.draw.Text', {
// 	        height: 350,
// 	        id : 'directionText',
// 	        x			 : 185,
// 	        y            : 455,
// 	        degrees: 180,
// 	        text: 'T E X T',
// 	        textStyle: {'font-size': '18px'}
// 	    }));
//		}
//		
//	}
//},