Ext.define('module.custom.dehansol.prod.workentry.view.WorkEntryListerDetail1', { extend: 'Axt.grid.Panel',

	alias		: 'widget.module-dehansol-workentry-detail1',
	store		: 'module.custom.dehansol.prod.workentry.store.WorkEntryDetail',
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
			me.dockedItems = [ {xtype: 'module-dehansol-workentry-detailSearch'} ];
			me.paging  = me.pagingItem();
			me.columns = me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{text : '<span class="btnTemp" style="font-size:1.5em;">수정</span>', iconCls: Const.MODIFY.icon, handler : me.insert  , cls: 'button-style',itemId : 'modify', width: 100, height : 35 } ,
					{text : '<span class="btnTemp" style="font-size:1.5em;">엑셀</span>', iconCls: Const.EXPORT.icon, action  : Const.EXPORT.action, cls: 'button-style',itemId : 'detail', width: 100, height : 35 },
					{text : '<span class="btnTemp" style="font-size:1.5em;">삭제</span>', iconCls: Const.DELETE.icon, handler : me.deleted , cls: 'button-style', width: 100, height : 35 }
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex : 'work_strt_dttm'	, width : 170, align : 'left'	, text : Language.get( 'work_strt_dttm'	, '시작일자'			)
					},{	dataIndex : 'work_endd_dttm'	, width : 170, align : 'left'	, text : Language.get( 'work_endd_dttm'	, '종료일자'			)
					},{	dataIndex :	'wk_time'			, width :  70, align : 'left'	, text : Language.get( 'wk_time'		, '작업시간'			)
					},{	dataIndex :	'item_code'			, width : 120, align : 'center'	, text : Language.get( 'item_code'		, 'TOOL CODE'		)
					},{	dataIndex : 'wkct_name'			, width :  80, align : 'left'	, text : Language.get( 'wkct_name'		, '공정'				)
					},{	dataIndex :	'cstm_name'			, flex  :   1, align : 'left'	, text : Language.get( 'cstm_name'		, '거래처명'			)
					},{	dataIndex :	'item_name'			, flex  :   2, align : 'left'	, text : Language.get( 'item_name'		, '품명'				)
					},{	dataIndex :	'wker_name'			, width :  70, align : 'left'	, text : Language.get( 'wker_name'		, '작업자'			)
					},{	dataIndex :	'dayn_dvcd'			, width :  50, align : 'center'	, text : Language.get( 'dayn_dvcd'		, '주야'				), xtype : 'lookupcolumn' , lookupValue : resource.lookup('dayn_dvcd')
					},{	dataIndex :	'prod_qntt'			, width :  80, align : 'right'	, text : Language.get( 'prod_qntt'		, '생산수량'			), xtype : 'numericcolumn', summaryType : 'sum'
					},{	dataIndex :	'ostt_qntt'			, width :  80, align : 'right'	, text : Language.get( 'ostt_qntt'		, '출고수량'			), xtype : 'numericcolumn', summaryType : 'sum'
					},{	dataIndex :	'stok_qntt'			, width :  80, align : 'right'	, text : Language.get( 'stok_qntt'		, '재고수량'			), xtype : 'numericcolumn', summaryType : 'sum'
					},{	dataIndex :	'succ_qntt'			, width :  80, align : 'right'	, text : Language.get( 'succ_qntt'		, '인계수량'			), xtype : 'numericcolumn', summaryType : 'sum'
					},{	dataIndex :	'poor_qntt'			, width :  80, align : 'right'	, text : Language.get( 'poor_qntt'		, '불량수량'			), xtype : 'numericcolumn', summaryType : 'sum'
					}
				]
			}
		;
		return item;
	},

	//TODO 수정
	insert : function () {
		var me				= this,
			grid			= me.up('grid'),
			select			= grid.getSelectionModel().getSelection()[0],
			store			= grid.getStore(),
			search			= Ext.ComponentQuery.query('module-dehansol-workentry-search')[0],
			wkct_idcd		= search.down('[name=wkct_name]').getValue(),
			invc_date		= new Date(),
			work_time		= '',
			dayn_dvcd		= '1',
			values			= '',
			work_strt_date	= new Date(),
			work_strt_time	= new Date(),
			work_endd_date	= new Date(),
			work_endd_time	= new Date()
		;
		if(me.itemId == 'modify'){
			if(select){
				values			= select.data;
				dayn_dvcd		= values.dayn_dvcd;
				work_strt_date	= select.get('work_strt_date');
				work_strt_time	= select.get('work_strt_time').substring(0,2)+":"+select.get('work_strt_time').substring(2,4);
				work_endd_date	= select.get('work_endd_date');
				work_endd_time	= select.get('work_endd_time').substring(0,2)+":"+select.get('work_endd_time').substring(2,4);
			}else{
				Ext.Msg.alert('알림','수정하려는 작업일지를 선택해주세요.');
				return;
			}
		}
		var	form = Ext.widget('form', {
			border				: false,
			bodyPadding			: 5,
			fieldDefaults		: {
				labelWidth		: 123,
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
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 5 5 0',width	: 500,
							items	: [
								{	fieldLabel	: Language.get('work_strt_date','시작일시'),
									name		: 'invc_date',
									xtype		: 'datefield',
									width		: 313,
									height		: 50,
									value		: work_strt_date,
									editable	: false,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									maxValue	: new Date(),
									margin		: '10 45 0 0',
									listeners	:{
										focus	:function(){
											results = this;
										}
									}
								},{	name		: 'work_strt_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									minValue	: '08:00',
									maxValue	: '21:00',
									width		: 95,
									height		: 50,
									increment	: 15,
									multiSelect	: false ,
									editable	: false,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									value		: work_strt_time,
									margin		: '10 10 0 0',
									trigger1Cls	: _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
									listConfig	:{
										itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
									listeners	:{
										focus	:function(){
											results	= this;
										}
									}
								}
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 5 5 0',width	: 500,
							items	: [
								{	fieldLabel	: Language.get('work_endd_date','종료일시'),
									name		: 'work_endd_date',
									xtype		: 'datefield',
									width		: 313,
									height		: 50,
									editable	: false,
									value		: work_endd_date,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									trigger1Cls : _global.options.work_book_tema+'dateTrigger',
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									margin		: '0 45 0 0',
									listeners	:{
										focus	:function(){
											results = this;
										}
									}
								},{	name		: 'work_endd_time',
									xtype		: 'timefield',
									format		: 'H:i',
									submitFormat: 'Hi',
									minValue	: '08:00',
									maxValue	: '21:00',
									width		: 95,
									height		: 50,
									multiSelect	: false ,
									editable	: false,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									value		: work_endd_time,
									margin		: '0 10 0 0',
									trigger1Cls	: _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
									listConfig	:{
										itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
									},
									listeners	:{
										focus	:function(){
											results	= this;
										}
									}
								}
							]
						},{	fieldLabel	: Language.get('cstm','거래처'),
							width		: 453,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'popupfield',
							editable	: false,
							enableKeyEvents : true,
							name		: 'cstm_name',
							pair		: 'cstm_idcd',
							value		: values.cstm_name,
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-cstm-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('cstm_name'));
									pairField.setValue(records[0].get('cstm_idcd'));
								}
							}
						},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true,value		: values.cstm_idcd,
							listeners	:{
								change:function(){
									form.down('[name=item_name]').popup.params.cstm_idcd = this.getValue();		//TODO popup에 CSTM_IDCD 넣어주는곳
									// popup params의 경우 render될때 만들어지므로 render될때 있는 변수값으로 넘어가게된다.
									// 유동적인 변수값을 params에 넣으려면 변수값이 변하는 이벤트에서 params로 넣어줘야한다.
								}
							}
						},{	fieldLabel	: Language.get('item_name','품명'),
							width		: 453,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							xtype		: 'popupfield',
							editable	: false,
							enableKeyEvents : true,
							name		: 'item_name',
							pair		: 'item_idcd',
							trigger1Cls : _global.options.work_book_tema+'searchTrigger',
							clearable	: false ,
							value		: values.item_name,
							required	: true,
							popup		: {
								select	: 'SINGLE',
								widget	: 'lookup-item-popup',
								params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema, item_path_dvcd : '1', acct_bacd : '원재료' },
								result	: function(records, nameField, pairField) {
									nameField.setValue(records[0].get('item_name'));
									pairField.setValue(records[0].get('item_idcd'));
								}
							}
						},{	name	: 'item_idcd', xtype : 'textfield' , hidden : true,value		: values.item_idcd,
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '5 5 5 0',width	: 500,
							items	: [
								{	fieldLabel	: Language.get('wker_name','작업자이름'),
									value		: '',
									width		: 313,
									height		: 50,
									labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
									cls			: 'textTemp',
									xtype		: 'popupfield',
									editable : false,
									enableKeyEvents : true,
									name		: 'wker_name',
									pair		: 'wker_idcd',
									margin 		: '0 45 0 0',
									value		: values.wker_name,
									trigger1Cls : _global.options.work_book_tema+'searchTrigger',
									clearable	: false ,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { stor_grp : _global.stor_grp , row_sts : '0',tema : _global.options.work_book_tema},
										result	: function(records, nameField, pairField) {
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name		: 'wker_idcd', xtype : 'textfield' , hidden : true,value		: values.wker_idcd,
								},{	labelCls	: 'textTemp '+_global.options.work_book_tema+'label',								// label에 클래스추가
									fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',								// field에 클래스추가
									xtype		: 'lookupfield',
									name		: 'dayn_dvcd',
									trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
									width		: 95,
									value		: dayn_dvcd,
									lookupValue	: resource.lookup('dayn_dvcd'),
									height		: 50,
									multiSelect	: false ,
									editable	: false,
									listConfig	:{
										itemCls	: _global.options.work_book_tema+'item'												// lookup list에 클래스 추가
									},
								}
							]
						},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
							name		: 'prod_qntt',
							xtype		: 'numericfield',
							width		: 436,
							height		: 50,
							value		: values.prod_qntt,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							listeners	:{
								focus	:function(){
									results = this;
								}
							}
						},{	fieldLabel	: Language.get('ostt_qntt','출고수량'),
							name		: 'ostt_qntt',
							xtype		: 'numericfield',
							value		: values.ostt_qntt,
							width		: 436,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							listeners	:{
								focus	:function(){
									results = this;
								},
								change	:function(){
									var	val			= this.getValue(),
										prod_qntt	= form.down('[name=prod_qntt]').getValue(),
										stok_qntt	= form.down('[name=stok_qntt]').getValue()
									;
									if(val+stok_qntt > prod_qntt){
										Ext.Msg.alert('알림','출고량과 재고량의 합은 생산량을 초과 할 수 없습니다.');
										return;
									}
								}
							}
						},{	fieldLabel	: Language.get('stok_qntt','재고수량'),
							name		: 'stok_qntt',
							xtype		: 'numericfield',
							value		: values.stok_qntt,
							width		: 436,
							height		: 50,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							listeners	:{
								focus	:function(){
									results = this;
								},
								change	:function(){
									var	val			= this.getValue(),
										prod_qntt	= form.down('[name=prod_qntt]').getValue(),
										ostt_qntt	= form.down('[name=ostt_qntt]').getValue()
									;
									if(val+ostt_qntt > prod_qntt){
										Ext.Msg.alert('알림','출고량과 재고량의 합은 생산량을 초과 할 수 없습니다.');
										return;
									}
								}
							}
						},{	fieldLabel	: Language.get('poor_qntt','불량수량'),
							name		: 'poor_qntt',
							xtype		: 'numericfield',
							value		: values.poor_qntt,
							width		: 436,
							height		: 50,
							minValue	: 0,
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
							cls			: 'textTemp',
							listeners	:{
								focus	:function(){
									results = this;
								}
							}
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
						var ostt_qntt , stok_qntt, prod_qntt,poor_qntt
						if(param.prod_qntt){
							prod_qntt = param.prod_qntt;
						}else{
							prod_qntt = 0;
						}
						if(param.ostt_qntt){
							ostt_qntt = param.ostt_qntt;
						}else{
							ostt_qntt = 0;
						}
						if(param.stok_qntt){
							stok_qntt = param.stok_qntt;
						}else{
							stok_qntt = 0;
						}
						if(param.poor_qntt){
							poor_qntt = param.poor_qntt;
						}else{
							poor_qntt = 0;
						}
						if(param.invc_date==null || param.invc_date ==''){
							Ext.Msg.alert("알림","시작일시를 반드시 입력해주십시오.");
						}else if(param.work_strt_time==null || param.work_strt_time ==''){
							Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
						}else if(param.dayn_dvcd==null || param.dayn_dvcd ==''){
							Ext.Msg.alert("알림","주/야 구분을 반드시 입력해주십시오.");
						}else if(param.work_endd_date==null || param.work_endd_date ==''){
							Ext.Msg.alert("알림","종료일시를 반드시 입력해주십시오.");
						}else if(param.work_endd_time==null || param.work_endd_time ==''){
							Ext.Msg.alert("알림","종료시간를 반드시 입력해주십시오.");
						}else if (param.item_idcd==null || param.item_idcd == ''){
							Ext.Msg.alert("알림","품목을 반드시 입력해주십시오.");
						}else if(Number(ostt_qntt)+Number(stok_qntt) > Number(prod_qntt)){
							Ext.Msg.alert('알림','출고량과 재고량의 합은 생산량을 초과 할 수 없습니다.');
							return;
						}else if(param.work_endd_date<param.invc_date){
							Ext.Msg.alert("알림","종료일시는 시작일시보다 작을 수 없습니다.");
							return;
						}else{
							var invc_numb,succ_qntt,work_strt_time,work_endd_time,prod_qntt,ostt_qntt,stok_qntt
							;
							if(param.work_strt_time != ''){
								work_strt_time = param.work_strt_time+'00';
							}
							if(param.work_endd_time != ''){
								work_endd_time = param.work_endd_time+'00';
							}
							if(param.work_endd_date != ''){
								work_endd_date = param.work_endd_date;
							}

							succ_qntt = prod_qntt - ostt_qntt - stok_qntt;
							if(me.itemId == 'insert'){
								console.log();
								Ext.Ajax.request({
									url		: _global.location.http() + '/listener/seq/maxid.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id	: _global.stor_id,
											table_nm: 'work_book'
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											invc_numb = result.records[0].seq;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}else{
								invc_numb = select.get('invc_numb');
							}
							record = Ext.create( store.model.modelName , {
								invc_numb		: invc_numb,
								prod_qntt		: param.prod_qntt,
								wkct_idcd		: wkct_idcd,
								cstm_idcd		: param.cstm_idcd,
								item_idcd		: param.item_idcd,
								invc_date		: param.invc_date,
								wker_idcd		: param.wker_idcd,
								dayn_dvcd		: param.dayn_dvcd,
								work_strt_time	: work_strt_time,
								work_endd_date	: work_endd_date,
								work_endd_time	: work_endd_time,
								succ_qntt		: succ_qntt,
								ostt_qntt		: ostt_qntt,
								stok_qntt		: stok_qntt,
								poor_qntt		: poor_qntt,
							});

							store.add(record);
							store.sync({
								callback: function(batch, options) {
									this.up('window').hide();
									store.reload();
								} ,
								scope	: this
							},{	synchro : _global.objects.synchro,_set : 'insert'} );
						}
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
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">작업실적 </span>',
			closeAction	: 'hide',
			width		: 880,
			height		: 620,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},

	//TODO 삭제
	deleted : function () {
		var	me		= this,
			grid	= me.up('grid'),
			store	= grid.getStore(),
			rec		= grid.getSelectionModel().getSelection()[0],
			length	= grid.getSelectionModel().getSelection().length
		;
		if(rec){
			if(length > 1){
				Ext.Msg.alert("알림","삭제하려는 작업내역을 하나만 선택해주십시오.");
				return;
			}
			var	form = Ext.widget('form', {
				border			: false,
				bodyPadding		: 10,
				itemId			:'delete',
				fieldDefaults	: {
					labelWidth		: 200,
					labelStyle		: 'text-align:right',
					labelSeparator	: '',
				},
				items:[
					{	xtype		: 'label',
						text		: '모든 데이터가 사라지며 복구할수없습니다',
						cls			: 'textTemp',
						style		: 'font-size:2em;'
					},{	xtype		: 'label',
						text		: '정말로 삭제하시겠습니까?',
						cls			: 'textTemp',
						style		: 'font-size:2em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: new Date(),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls		: 'button-style',
						flex	:1,
						height	:50,
						handler	: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'delete'} );
						}
					},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls		: 'button-style',
						flex	: 1,
						height	: 50,
						handler	: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});
			win = Ext.widget('window', {
				title		: '<span class="btnTemp" style="font-size:15px; color:black;">삭제</span>',
				closeAction	: 'destroy',
				width		: 500,
				height		: 180,
				layout		: 'fit',
				resizable	: true,
				modal		: true,
				items		: form,
				defaultFocus: ''
			});
			win.show();
		}else{
			Ext.Msg.alert("알림","삭제하려는 작업일지를 선택해주십시오.");
		}
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