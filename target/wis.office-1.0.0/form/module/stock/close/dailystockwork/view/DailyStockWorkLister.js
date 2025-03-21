Ext.define('module.stock.close.dailystockwork.view.DailyStockWorkLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-dailystockwork-lister',
	store		: 'module.stock.close.dailystockwork.store.DailyStockWork',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	border		: 0,
	columnLines : false,
	features	: [{ ftype : 'grid-summary' } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},

	initComponent: function () {
		var me = this;
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : '<span class="btnTemp" style="font-size:1.5em;">재고현황 작성</span>', cls: 'button1-style', action : 'writeAction', width: 200, height : 35} , '-',
					{	text : '<span class="btnTemp" style="font-size:1.5em;">품목추가</span>', cls : 'btn btn-info', handler : me.insert, itemId : 'insert', width: 100, height : 35, margin: '0 0 0 5'},'-' ,
					{	text : '<span class="btnTemp" style="font-size:1.5em;">재고입력</span>', cls : 'btn btn-info', handler : me.insert, itemId : 'modify', width: 100, height : 35, margin: '0 0 0 5'},'-' ,
					{	text : '<span class="btnTemp" style="font-size:1.5em;">삭제</span>', cls: 'btn btn-danger', action : Const.DELETE.action , width: 100, height : 35, margin: '0 0 0 5'},
					'-', '-' ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items	: [
					{	dataIndex: 'wkct_idcd'		, width: 180, align : 'center'	, text: Language.get('wkct_idcd'		, '공정ID'	), hidden : true
					},{	dataIndex: 'cstm_name'		, width: 170, align : 'left'	, text: Language.get('cstm_name'		, '거래처명'	)
					},{	dataIndex: 'item_code'		, width: 150, align : 'center'	, text: Language.get('item_code'		, '품목코드'	),
					},{	dataIndex: 'invc_date'		, width:  80, align : 'center'	, text: Language.get('date'				, '일자'		), hidden : true
					},{	dataIndex: 'modify'			, width:  80, align : 'center'	, text: Language.get('modify'			, '수정확인'	), hidden : true
					},{	dataIndex: 'item_idcd'		, width:  80, align : 'center'	, text: Language.get('item_idcd'		, '품목ID'	), hidden : true
					},{	dataIndex: 'item_name'		, width: 150, align : 'left'	, text: Language.get('item_name'		, '품명'		),
					},{	dataIndex: 'item_spec'		, width: 170, align : 'left'	, text: Language.get('item_spec'		, '규격'		),
					},{	dataIndex: 'unit_name'		, width:  60, align : 'center'	, text: Language.get('unit_name'		, '단위'		)
					},{	dataIndex: 'optm_stok_qntt'	, width: 110, align : 'right'	, text: Language.get('optm_stok_qntt'	, '적정재고'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'pday_stok_qntt'	, width: 110, align : 'right'	, text: Language.get('pday_stok_qntt'	, '전일재고'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'tody_stok_qntt'	, width: 110, align : 'right'	, text: Language.get('tody_stok_qntt'	, '당일재고'	), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'exc_qntt'		, width: 110, align : 'right'	, text: Language.get('exc_qntt'			, '과부족수량'), xtype: 'numericcolumn', summaryType: 'sum'
					},{	dataIndex: 'user_memo'		, flex :   1, align : 'left'	, text: Language.get('user_memo'		, '메모'		)
					}
				]
			}
		;
		return item;
	},

	//TODO 추가
	insert : function () {
		var me				= this,
			grid			= me.up('grid'),
			select			= grid.getSelectionModel().getSelection()[0],
			store			= grid.getStore(),
			search			= Ext.ComponentQuery.query('module-dailystockwork-search')[0],
			invc_date		= search.down('[name=invc_date]').getValue()
			wkct_idcd		= search.down('[name=wkct_name]').getValue(),
			itemId			= me.itemId,
			trof			= false,
			width			= 0
		;

		if(me.itemId == 'modify'){
			if(select){
				values			= select.data;
				cstm_idcd		= values.cstm_idcd;
				cstm_name		= values.cstm_name;
				item_idcd		= values.item_idcd;
				item_name		= values.item_name;
				optm_stok_qntt	= values.optm_stok_qntt;
				tody_stok_qntt	= values.tody_stok_qntt;
				pday_stok_qntt	= values.pday_stok_qntt;
				user_memo		= values.user_memo;
				exc_qntt		= tody_stok_qntt - optm_stok_qntt;
				trof			= true;
				width			= 433;
			}else{
				Ext.Msg.alert('알림','수정하려는 재고현황을 선택해주세요.');
				return;
			}
		}else{
			cstm_idcd		= '';
			cstm_name		= '';
			item_idcd		= '';
			item_name		= '';
			optm_stok_qntt	= 0;
			tody_stok_qntt	= 0;
			pday_stok_qntt	= 0;
			user_memo		= '';
			exc_qntt		= 0;
			width			= 450;
		}

		var	form = Ext.widget('form', {
			border				: false,
			bodyPadding			: 5,
			fieldDefaults		: {
				labelWidth		: 170,
				labelStyle		: 'text-align:right',
				labelSeparator	: '',
			},
			itemId				: 'insert_form',
			layout				: { type: 'hbox', align: 'stretch' } ,
			items:[
				{	xtype	: 'panel',
					border	: 0,
					margin	: '5 10 10 0',
					items	: [
						{	fieldLabel	: Language.get('cstm','거래처'),
							width		: width,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'cstm_name',
							value		: cstm_name,
							pair		: 'cstm_idcd',
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							readOnly	: trof,
							allowBlank	: false,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' ,value : cstm_idcd, hidden : true,
							listeners	:{
								change:function(){
									form.down('[name=item_name]').popup.params.cstm_idcd = this.getValue();		//TODO popup에 CSTM_IDCD 넣어주는곳
									// popup params의 경우 render될때 만들어지므로 render될때 있는 변수값으로 넘어가게된다.
									// 유동적인 변수값을 params에 넣으려면 변수값이 변하는 이벤트에서 params로 넣어줘야한다.
								}
							}
						},{	fieldLabel	: Language.get('item','품목'),
							width		: width,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'item_name',
							value		: item_name,
							pair		: 'item_idcd',
							allowBlank	: false,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							readOnly	: trof,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema, acct_bacd : '반제품'},
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
						},{	name	: 'item_idcd', xtype : 'textfield', value : item_idcd, hidden : true,
						},{	fieldLabel	: Language.get('optm_stok_qntt','적정재고수량'),
							width		: 433,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'numericfield',
							name		: 'optm_stok_qntt',
							value		: optm_stok_qntt,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							listeners	: {
								focus	:function(){
									results = this;
								},
								change	: function(){
									var val = this.getValue()
										tody = form.down('[name=tody_stok_qntt]').getValue()
										exc_qntt = form.down('[name=exc_qntt]')
									;
									exc_qntt.setValue(tody - val);
								}
							}
						},{	fieldLabel	: Language.get('pday_stok_qntt','전일재고수량'),
							width		: 433,
							height		: 50,
							readOnly	: true,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'numericfield',
							name		: 'pday_stok_qntt',
							value		: pday_stok_qntt,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
						},{	fieldLabel	: Language.get('tody_stok_qntt','금일재고수량'),
							width		: 433,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'numericfield',
							name		: 'tody_stok_qntt',
							value		: tody_stok_qntt,
							minValue	: 0,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							listeners	: {
								focus	:function(){
									results = this;
								},
								change	: function(){
									var val = this.getValue()
										optm = form.down('[name=optm_stok_qntt]').getValue()
										exc_qntt = form.down('[name=exc_qntt]')
									;
									exc_qntt.setValue(val - optm);
								}
							}
						},{	fieldLabel	: Language.get('','과부족수량'),
							width		: 433,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'numericfield',
							readOnly	: true,
							name		: 'exc_qntt',
							value		: exc_qntt,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 5 5 0',width	: 500,
							items	: [
								{	fieldLabel	: Language.get('user_memo','비고'),
									width		: 433,
									height		: 120,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldStyle	: 'font-size:3em !important; text-align : left;',
									xtype		: 'textarea',
									name		: 'user_memo',
									value		: user_memo,
									margin 		: '0 45 0 0',
									clearable	: false
								}
							]
						},{	name	: 'stok_mngt_yorn', xtype : 'textfield' , hidden : true
						}
					]
				},{	xtype	: 'panel',
					border	: 2,
					items			: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5',width	: 320,
							items	: [
								{	name		: 'result',
									xtype		: 'textfield',
									readOnly	: false,
									width		: 200,
									margin		: '20 0 0 5 ',
									height		: 50,
									fieldStyle	: 'font-size:3em !important; text-align : right; font-weight:bold;',
								},{	xtype		: 'button',
									name		: 'enter',
									cls			: 'button_enter',
									width		: 100,
									border		: 0,
									height		: 60,
									margin		: '15 5 0 8',
									listeners	:{
										click	:function(field){
											if(typeof(results)=='undefined'){
												Ext.Msg.alert("error", "입력할 필드를 선택해주세요."  );
											}else{
												me.up('grid').clickButton(field.name,field,results);
											}
										}
									}
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5',width	: 320,
							items	: [
								{	xtype		: 'button',
									name		: '1',
									flex		: 1,
									height		: 68,
									border		: 0,
									cls			: 'number_1',
									margin		: '5',
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									},
								},{	xtype		: 'button',
									name		: '2',
									cls			: 'number_2',
									flex		: 1,
									margin		: '5',
									height		: 68,
									border		: 0,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '3',
									cls			: 'number_3',
									flex		: 1,
									margin		: '5',
									height		: 68,
									border		: 0,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5',width	: 320,
							items	: [
								{	xtype		: 'button',
									name		: '4',
									cls			: 'number_4',
									flex		: 1,
									height		: 68,
									border		: 0,
									margin		: '5',
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '5',
									cls			: 'number_5',
									flex		: 1,
									border		: 0,
									margin		: '5',
									height		: 68,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '6',
									cls			: 'number_6',
									flex		: 1,
									margin		: '5',
									border		: 0,
									height		: 68,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5',width	: 320,
							items	: [
								{	xtype		: 'button',
									name		: '7',
									cls			: 'number_7',
									flex		: 1,
									height		: 68,
									border		: 0,
									margin		: '5',
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '8',
									cls			: 'number_8',
									flex		: 1,
									margin		: '5',
									border		: 0,
									height		: 68,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '9',
									cls			: 'number_9',
									flex		: 1,
									border		: 0,
									margin		: '5',
									height		: 68,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5',width	: 320,
							items	: [
								{	xtype		: 'button',
									name		: 'left',
									flex		: 1,
									margin		: '5',
									border		: 0,
									cls			: 'clear_left',
									height		: 68,
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: '0',
									cls			: 'number_0',
									flex		: 1,
									border		: 0,
									height		: 68,
									margin		: '5',
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.name,field,'');
										}
									}
								},{	xtype		: 'button',
									name		: 'clear',
									flex		: 1,
									height		: 68,
									margin		: '5',
									border		: 0,
									cls			: 'button_clear',
									listeners	:{
										click	:function(field){
											me.up('grid').clickButton(field.cls,field,'');
										}
									}
								}
							]
						}
					],
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	:1,
					height	:50,
					handler	: function() {
						var param = Ext.merge( this.up('form').getValues() );
						if(param.cstm_idcd == '' || param.cstm_idcd == null){
							Ext.Msg.alert("알림","거래처를 반드시 선택하여 주십시오.");
							return;
						}else if(param.item_idcd == '' || param.item_idcd == null){
							Ext.Msg.alert("알림","품목을 반드시 선택하여 주십시오.");
							return;
						}
						if(param.tody_stok_qntt < 0){
							return;
						}
						record = Ext.create( store.model.modelName , {
							wkct_idcd		: wkct_idcd,
							invc_date		: Ext.Date.format(invc_date,'Ymd'),
							cstm_idcd		: param.cstm_idcd,
							item_idcd		: param.item_idcd,
							optm_stok_qntt	: param.optm_stok_qntt,
							tody_stok_qntt	: param.tody_stok_qntt,
							pday_stok_qntt	: param.pday_stok_qntt,
							user_memo		: param.user_memo
						});

						store.add(record);
						store.sync({
							callback: function(batch, options) {
								this.up('window').hide();
								store.reload();
							} ,
							scope	: this
						},{	synchro : _global.objects.synchro} );
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	:1,
					height	:50,
					handler	: function() {
						results='';
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;"></span>',
			closeAction	: 'hide',
			width		: 900,
			height		: 580,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();
	},

	//TODO 키패드 기능
	clickButton:function(value,field,results){
		var me		= this,
			form	= field.up('form'),
			result	= form.down('[name=result]'),
			once	= form.down('[name=result]').getValue(),
			request	= []
		;
		if(once == null){
			once ='0';
		}
		if(value == 'enter'){
			if(once<0){
				Ext.Msg.alert("error","값을 확인해주세요.");
			}else{
				if(results){
					results.setValue(once);
					result.setValue("");
				}else{
					Ext.Msg.alert("error", "입력할 필드를 선택해주세요."  );
				}

			}
		}else if(value == 'button_clear'){
			result.setValue('');
		}else if(value == 'left'){
			var p = once+'';
			var s = p.length;
			result.setValue(p.substr(0,s-1));
		}else{
			result.setValue(once+(value+''));
		}
	}
});
