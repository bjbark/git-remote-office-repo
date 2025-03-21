Ext.define('module.custom.kitec.prod.floorticket.view.FloorTicketPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-kitec-floorticket-popup',

	title		: Language.get('flor_tick','층별관리현품표 발행'),
	closable	: true,
	autoShow	: true,
	width		: 230 ,
	height		: 220,
	layout		: {
		type : 'border'
	},

	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	 * 화면폼
	 */
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction,cls: 'button-style'},'-',
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var me	= this,
		form = {
			xtype	: 'form-panel',
			border	:  false,
			itemId	: 'invc',
			margin	: '15 7 0 -10',
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'hbox',
					border	: 0,
					items	: [
						{	xtype		: 'form-panel',
							border		: 0,
							width		: 370,
							fieldDefaults: { width : 200, labelWidth : 95, labelSeparator : '' },
							items		: [
								{	fieldLabel	: Language.get('date','일자'),
									xtype		: 'datefield',
									name		: 'deli_date',
									enableKeyEvents : true,
									format		: Const.DATE_FORMAT_YMD_BAR,
									submitFormat: Const.DATE_FORMAT_YMD,
									value		: new Date()
								},{	fieldLabel	: Language.get('cvic','설비'),
									xtype		: 'popupfield',
									name		: 'cvic_name',
									pair		: 'cvic_idcd',
									editable	: true,
									clearable	: true,
									enableKeyEvents	: true,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-cvic-popup',
										params	:{

										},
										result : function(records, nameField, pairField) {
											nameField.setValue(records[0].get('cvic_name'));
											pairField.setValue(records[0].get('cvic_idcd'));
										}
									}
								},{	xtype		: 'textfield', name : 'cvic_idcd' , hidden : true
								},{	fieldLabel	: Language.get('shift','주/야'),
									xtype		: 'lookupfield',
									name		: 'shift',
									lookupValue	: resource.lookup('work_dvcd'),
									value		: "1"
								},{	fieldLabel	: Language.get('prod_qntt2','생산수량'),
									xtype		: 'numericfield',
									name		: 'qntt1',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAP) {
												me.down('[name=qntt2]').focus(true,10);
											}
										},
									}
								},{	fieldLabel	: Language.get('box_qntt','박스당수량'),
									xtype		: 'numericfield',
									name		: 'qntt2',
									enableKeyEvents : true,
									listeners	: {
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == e.TAP) {
												var qntt1 =  me.down('[name=qntt1]').getValue()
												if(qntt1 =='' || qntt1 <= 0){
													me.down('[name=qntt1]').focus(true,10);
												}else{
													if(qntt1 < this.getValue()){
														this.setValue(qntt1);
														me.down('[name=qntt1]').focus(true,10);
													}
													me.finishAction();
												}
											}
										},
									}
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	//확인
	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			record	= baseform.getRecord(),
			values	= baseform.getValues(),
			lister	= Ext.ComponentQuery.query('module-kitec-floorticket-lister')[0],
			store	= lister.getStore()
		;
		if(Number(values.qntt2)>Number(values.qntt1)){
			baseform.down('[name=qntt2]').setValue(baseform.down('[name=qntt1]').getValue());
			baseform.down('[name=qntt1]').focus(true,10);
		}else if(values.qntt1<= 0){
			baseform.down('[name=qntt1]').focus(true,10);
		}else if(values.qntt2 <= 0){
			baseform.down('[name=qntt2]').focus(true,10);
		}else if(values.deli_date==''){
			Ext.Msg.alert('알림','납품일자를 선택해주세요.');
		}else if(values.cvic_idcd==''){
			Ext.Msg.alert('알림','설비를 선택해주세요.');
		}else{
			var param = Ext.merge( values );
			var jrf		= 'Kitec_ItemTag2_ad.jrf',
				resId	= _global.hq_id.toUpperCase(),
				arg = 'deli_date~'+param.deli_date+'~'+'item_idcd~'+me.params.item_idcd+'~'+'qntt1~'+param.qntt1+'~'+'qntt2~'+param.qntt2+'~'+'shift~'+param.shift+'~'+'cvic_idcd~'+param.cvic_idcd+'~',
				url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}',
				win = window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=950')
			;
			me.close();
			return win;
		}
	}
});
