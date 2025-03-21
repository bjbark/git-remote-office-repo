Ext.define('module.custom.iypkg.prod.workentry.view.WorkEntryMaster2', { extend: 'Axt.grid.Panel',
	alias	: 'widget.module-workentry-master2',
	store	: 'module.custom.iypkg.prod.workentry.store.WorkEntryMaster2',
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	region : 'center',
	border : 0,
	columnLines: true,
	features: [{ftype :'grid-summary'}],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } /*, { ptype:'filterbar', renderHidden : true  }*/],

	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">불량/유실 보고</span>'	, cls: 'button1-style'	, width: 90,
						handler:  function() {
							var master    = Ext.ComponentQuery.query('module-workentry-master2')[0],
								select    = master.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","제품정보를 조회할 목록을 선택하여주십시오.");
							}else{
								me.iteminfo(select);
							}
						}
					} , '-',
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action , button : 'lister' , cls: 'button-style'},
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , button : 'lister' , cls: 'button-style'},
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action , button : 'lister' , cls: 'button-style'}
				]
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'invc_date'		, width: 100, align : 'center'	, text: Language.get('invc_date'	, '작업일자'		)
					},{	dataIndex:	'wkct_stnm'		, width:  80, align : 'left'	, text: Language.get('wkct_stnm'	, '보조명'		)
					},{	dataIndex:	'wkun_dvcd'		, width:  80, align : 'center'	, text: Language.get('wkun_dvcd'	, '작업단위'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('wkun_dvcd'),
					},{	dataIndex:	'prod_qntt'		, width:  80, align : 'right'	, text: Language.get('prod_qntt'	, '생산량'		), xtype: 'numericcolumn', summaryType: 'sum' , format: '#,##0'
					},{	dataIndex:	'unit_name'		, width:  80, align : 'center'	, text: Language.get('unit_name'	, '수량단위'		)
					},{	dataIndex:	'prog_stat_dvcd', width:  80, align : 'center'	, text: Language.get('prog_s tat_dvcd', '상태'		), xtype : 'lookupcolumn' , lookupValue : resource.lookup('prog_stat_dvcd'),
					}
				]
			}
		;
		return item;
	}
	,iteminfo : function (select) {
		var search     = Ext.ComponentQuery.query('module-workentry-search')[0],
		poor       = Ext.ComponentQuery.query('module-workentry-poor')[0],
		store      = Ext.ComponentQuery.query('module-workentry-master2')[0].getStore(),
		me         = this
	;
	var form = Ext.widget('form', {
		border         : false,
		itemId         : 'info',
		layout         : 'border',
		bodyPadding    : 5,
		fieldDefaults  : {
			labelWidth : 150,
			labelStyle : 'text-align:right',
			labelSeparator : '',
		},
		items:[
			{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0', region:'north',
				items	: [
					{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
						xtype : 'button',
						handler:  function(){
							var detail    = Ext.ComponentQuery.query('module-workentry-master2')[0],
								select    = detail.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","불량을 등록할 건을 선택하여주십시오.");
							}else{
								me.poor()
							}
						},
						cls: 'button-left btn btn-danger',
						width: 150,
						height: 50,
						margin: '0 0 0 237'
					},{	text : '<span class="btnTemp" style="font-size:2.5em;">유실보고</span>'  ,
						xtype : 'button',
						handler:  function(){
							var detail    = Ext.ComponentQuery.query('module-workentry-master2')[0],
								select    = detail.getSelectionModel().getSelection()[0]
							;
							if(!select){
								Ext.Msg.alert("알림","유실 보고할 건을 선택하여주십시오.");
							}else{
								me.fail()
							}
						},
						cls: 'button-left btn btn-warning',
						width: 150,
						height: 50,
						margin: '0 0 0 446'
					}
				]
			},{	xtype : 'module-workentry-poor', region:'west' , flex : 1, height:200 ,margin: '0 0 0 17'
			},{	xtype : 'module-workentry-fail',region:'center', flex : 1, height:200 ,margin: '0 17 0 0'
			}
		],
		buttons: [
			{	text	: '<span class="btnTemp" style="font-size:3em">닫기</span>',
				cls		: 'button-style',
				flex	: 1,
				height	:50,
				handler	: function() {
					this.up('form').getForm().reset();
					Ext.ComponentQuery.query('#info')[0].up('window').destroy();
				}
			}
		]
	});


	win = Ext.widget('window', {
		title		: '<span class="btnTemp" style="font-size:15px; color:black;">불량/유실 보고</span>',
		closeAction	: 'destory',
		width		: 1249,
		height		: 844,
		layout		: 'fit',
		resizable	: true,
		modal		: true,
		items		: form,
		defaultFocus: ''
	});
	win.show();
},

//TODO 불량내역
poor : function (rec) {
	var store      = Ext.ComponentQuery.query('module-workentry-master2')[0].getStore(),
		poorLookup = new Array(),
		me         = this
	;
	var form = Ext.widget('form', {
		border         : false,
		itemId         : 'poor',
		bodyPadding    : 10,
		fieldDefaults  : {
			labelWidth     : 150,
			labelStyle     : 'text-align:right',
			labelSeparator : '',
		},
		items:[
			{	xtype		: 'label',
				text		:'불량유형과 불량수량을 입력하여 주십시오.',
				style		: {
					fontSize: '20px',
					color	: 'darkblue'
				},
				cls			: 'textTemp',
				margin		: '0 0 0 62'
			},{	fieldLabel	: Language.get('poor_name', ' '),
				labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
				fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
				xtype		: 'textfield',
				name		: 'poor_name',
				width		: 413,
				height		: 50,
				maxWidth	: 500,
				readOnly	: true,
				labelWidth	: 210,
				margin		: '20 0 0 0'
			},{ xtype:'textfield', name : 'poor_bacd',hidden:true
			},{	fieldLabel	: Language.get('poor_qntt', '불량수량'),
				labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
				fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
				xtype		: 'popupfield',
				editable	: true,
				enableKeyEvents : true,
				name		: 'poor_qntt',
				width		: 430,
				height		: 50,
				maxWidth	: 500,
				labelWidth	: 210,
				margin		: '20 0 0 0',
				listConfig	:{
					itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
				},
				handleMouseEvents:true,
				listeners:{
					render:function(field ){
						field.getEl().on('click', function( event, el ) {
							var trigger1 = Ext.dom.Query.select('.trigger1')[0];
							Ext.get(trigger1).dom.click();
						});
					}
				},
				popup: {
					select	: 'SINGLE',
					widget	: 'lookup-keypad-popup',
					params	: { stor_grp : _global.stor_grp},
					result	: function(records, nameField, pairField){
						nameField.setValue(records[0].result);
					}
				},
				trigger1Cls : 'hideCls trigger1',
			},{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">흑점</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('01');
						poor_name.setValue('흑점');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">BURR</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('02');
						poor_name.setValue('BURR');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">GAS</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('03');
						poor_name.setValue('GAS');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">미성형</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('04');
						poor_name.setValue('미성형');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">웰드</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('05');
						poor_name.setValue('웰드');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">수축</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('06');
						poor_name.setValue('수축');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">CRACK</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('07');
						poor_name.setValue('CRACK');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">스크래치(멍)</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('08');
						poor_name.setValue('스크래치(멍)');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">이물</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('09');
						poor_name.setValue('이물');
					}
				}
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">실바리</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('10');
						poor_name.setValue('실바리');
					}
				},
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">기름</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('11');
						poor_name.setValue('기름');
					}
				}
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">기타</span>',
				cls     : 'poorbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue('12');
						poor_name.setValue('기타');
					}
				}
			}
		],
		buttons: [
			{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
				cls		: 'button-style',
				flex	: 1,
				height	:50,
				handler	: function() {
					var form		= this.up('form'),
						poor_bacd	= form.down('[name=poor_bacd]'),
						poor_name	= form.down('[name=poor_name]')
					;
					if(poor_bacd.getValue()){
						me.poorupdate(form.getValues());
					}else{
						return;
					}

//					this.up('form').getForm().reset();
					win.destroy();
				}
			},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
				cls		: 'button-style',
				flex	: 1,
				height	:50,
				handler	: function() {
					this.up('form').getForm().reset();
//					this.up('window').destroy();
					win.destroy();
				}
			}
		]
	});

	win = Ext.widget('window', {
		title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량내역</span>',
		closeAction	: '',
		width		: 581,
		layout		: 'fit',
		resizable	: true,
		modal		: true,
		items		: form,
		defaultFocus: ''
	});
	win.show();
},
//TODO 유실보고
fail : function (rec) {
	var store      = Ext.ComponentQuery.query('module-workentry-master2')[0].getStore(),
		me         = this
	;
	var form = Ext.widget('form', {
		border         : false,
		itemId         : 'fail',
		bodyPadding    : 10,
		fieldDefaults  : {
			labelWidth : 150,
			labelStyle : 'text-align:right',
			labelSeparator : '',
		},
		items:[
			{	xtype		: 'label',
				text		:'유실 유형과 유실 시간을 입력하여 주십시오.',
				style		: {
					fontSize: '20px',
					color	: 'darkblue'
				},
				cls			: 'textTemp',
				margin		: '0 0 10 89'
			},{	fieldLabel	: Language.get('loss_resn_name', ' '),
				labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
				fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
				xtype		: 'textfield',
				name		: 'loss_resn_name',
				width		: 419,
				labelWidth	: 130,
				height		: 50,
				maxWidth	: 500,
				readOnly	: true,
				margin		: '20 0 0 0'
			},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
			},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
				items	: [
					{	fieldLabel	: Language.get('sttm','시간'),
						name		: 'sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						labelWidth	: 60,
						submitFormat: 'Hi',
						value		: new Date(),
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						margin		: '0 0 0 70',
						readOnly	: false,
						width		: 180,
						height		: 50,
						labelStyle	: 'line-height: 45px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
						cls			: 'textTemp'
					},{	fieldLabel	: Language.get('','~'),
						name		: 'edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						margin		: '0 0 0 10',
						labelWidth	: 15,
						value		: '',
						minValue	: '00:00 AM',
						maxValue	: '23:59 PM',
						readOnly	: false,
						margin		: '0 0 0 50',
						width		: 135,
						height		: 50,
						labelStyle	: 'line-height: 45px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
						trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
						cls			: 'textTemp'
					}
				]
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">계획정지</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('01');
						loss_resn_name.setValue('계획정지');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">일시정지</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('02');
						loss_resn_name.setValue('일시정지');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:1.7em;color:white;">원재료 교환</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('03');
						loss_resn_name.setValue('원재료 교환');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">승인대기</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('04');
						loss_resn_name.setValue('승인대기');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형교환</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('05');
						loss_resn_name.setValue('금형교환');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형이상</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('06');
						loss_resn_name.setValue('금형이상');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20',
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">사출기고장</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('07');
						loss_resn_name.setValue('사출기고장');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				hidden:true
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">로보트고장</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('08');
						loss_resn_name.setValue('로보트고장');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타설비고장</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('09');
						loss_resn_name.setValue('기타설비고장');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 0 20'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">시사출</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('10');
						loss_resn_name.setValue('시사출');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 30 30'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">샘플</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('11');
						loss_resn_name.setValue('샘플');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 30 20'
			},{	xtype	: 'button',
				text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타(인원등)</span>',
				listeners :{
					click : function(){
						var form			= this.up('form'),
							loss_resn_name	= form.down('[name=loss_resn_name]'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
						;
						loss_resn_dvcd.setValue('12');
						loss_resn_name.setValue('기타(인원등)');
					}
				},
				cls     : 'failbutton-style',
				width   : 150,
				height  : 50,
				margin  :'30 0 30 20'
			}
		],
		buttons: [
			{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
				cls		: 'button-style',
				flex	: 1,
				height	:50,
				handler	: function() {
					var form			= this.up('form'),
						loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
						loss_resn_name	= form.down('[name=loss_resn_name]')
					;
					if(loss_resn_dvcd){
						me.failupdate(form.getValues());
					}else{
						return;
					}
//					form.getForm().reset();
					win.destroy();
				}
			},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
				cls		: 'button-style',
				flex	: 1,
				height	:50,
				handler	: function() {
					this.up('form').getForm().reset();
					win.destroy();
//					Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
				}
			}
		]
	});

	win = Ext.widget('window', {
		title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
		closeAction	: 'destory',
		width		: 586,
		layout		: 'fit',
		resizable	: true,
		modal		: true,
		items		: form,
		defaultFocus: ''
	});
	win.show();
},
//TODO 불량 업로드 function
poorupdate : function (param) {
	var me = this,
		poor_qntt = param.poor_qntt,
		poor_bacd = param.poor_bacd,
		detail    = Ext.ComponentQuery.query('module-workentry-master2')[0],
		poor      = Ext.ComponentQuery.query('module-workentry-poor')[0],
		select    = detail.getSelectionModel().getSelection()[0],
		line_seqn = 0,
		sttm1      = select.get('work_sttm'),
		edtm1      = select.get('work_edtm'),
		sttm       = null,
		edtm       = ''
	;
	if(poor_bacd==''||poor_bacd==null){
		Ext.Msg.alert("알림","불량유형을 반드시 선택하여 주십시오.");
	}
	if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
		Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
	}else{
		if(sttm1!=null||sttm1!=undefined){
			sttm = sttm1.replace(':','');
		}
		if(edtm1!=null||edtm1!=undefined){
			edtm = edtm1.replace(':','');
		}
		//line_seqn count
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv5/get/poorseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
				line_seqn = result.records[0].line_seqn;
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		line_seqn= line_seqn+1;

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv5/set/poor.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					_set			: 'insert',
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb'),
					line_seqn		: line_seqn,
					invc_date		: select.get('invc_date').replace(/-/g,""),
					poor_bacd		: poor_bacd,
					sttm			: sttm,
					edtm			: edtm,
					wker_idcd		: select.get('wker_idcd'),
					good_qntt		: null,
					poor_qntt		: poor_qntt,
					loss_qntt		: null,
					runn_dsct_yorn	: null
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
				poor.getStore().reload();
			}
		});
	}
},
//TODO 유실보고 업로드 function
failupdate : function (param) {
	var me = this,
		sttm1     = param.sttm,
		edtm1     = param.edtm,
		loss_resn_dvcd     = param.loss_resn_dvcd,
		sttm      = sttm1.replace(':',''),
		edtm      = '',
		detail    = Ext.ComponentQuery.query('module-workentry-master2')[0],
		fail      = Ext.ComponentQuery.query('module-workentry-fail')[0],
		select    = detail.getSelectionModel().getSelection()[0],
		line_seqn = 0,
		loss_time = 0,
		sttm_hour = sttm.substring(0,2),
		sttm_min  = sttm.substring(2,4),
		edtm_hour  = '';
		edtm_min  = '',
		time = 0,
		min  = 0
	;
	if(edtm1){
		edtm		= edtm1.replace(':','')+"00";
		edtm_hour	= edtm.substring(0,2);
		edtm_min	= edtm.substring(2,4)
		time		= edtm_hour-sttm_hour;
		min			= edtm_min-sttm_min
	}
	if(loss_resn_dvcd==null||loss_resn_dvcd==''){
		Ext.Msg.alert("알림","유실유형을 선택하여주십시오.");
		return;
	}
	if(sttm1==null||sttm1==''){
		Ext.Msg.alert("알림","시간을 다시 입력하여주십시오.");
		return;
	}else{
		if(min < 0){
			time = edtm_hour-sttm_hour-1;
			min  = edtm_min-sttm_min + 60;
		}
		var total = (time*60)+min;
		//line_seqn count
		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv5/get/failseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
				line_seqn = result.records[0].line_seqn;
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		line_seqn= line_seqn+1;

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/order/workbookv5/set/fail.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					_set			: 'insert',
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb'),
					line_seqn		: line_seqn,
					invc_date		: select.get('invc_date').replace(/-/g,""),
					wkct_idcd		: select.get('wkct_idcd'),
					loss_resn_dvcd	: loss_resn_dvcd,
					sttm			: sttm+'00',
					edtm			: edtm,
					loss_time		: total,
					loss_pcnt		: 0,
					loss_mnhr		: 0,
					work_dsct_yorn	: 0,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
				fail.getStore().reload();
			}
		});
	}
},

});
