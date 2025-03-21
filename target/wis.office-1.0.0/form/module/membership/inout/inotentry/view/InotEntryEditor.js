Ext.define('module.membership.inout.inotentry.view.InotEntryEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-inotentry-editor',

	height : 240,
	layout : {
	type: 'border'
	},

	title			: Language.get('','예약 및 레슨 정보'),
	collapsible 	: true	,
	collapsed		: true	,
	defaultFocus	: 'mmbr_code',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = [me.createTabs()];
		console.log(_global.options.item_spec_disp_yorn);
		me.callParent(arguments)  ;
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
				'->', '-',
				{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
				{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				itemId			: 'mainForm',
				width			: 500,
//				flex			: 1,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 340, labelWidth : 65, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 2 0',
						items	: [
							{	fieldLabel	: Language.get('mmbr_name','회원명'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'mmbr_name',
								pair		: 'mmbr_idcd',
								clearable	: true,
								width		: 160,
								labelWidth	: 60,
								margin		: '0 0 0 6',
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								allowBlank	: false,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-member-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('mmbr_name'));
										pairField.setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_idcd]').setValue(records[0].get('mmbr_idcd'));
										me.down('[name=mmbr_name]').setValue(records[0].get('mmbr_name'));
									}
								}
							},{	name		: 'mmbr_idcd', xtype : 'textfield' , hidden : true,
							},{	fieldLabel	: Language.get('mmbr_code','회원코드'),
								xtype		: 'textfield',
								name		: 'mmbr_code',
								allowBlank	: true,
								width		: 130,
								labelWidth	: 60,
								readOnly	: true,
								hidden		: true
							},{	fieldLabel	: Language.get('mmbr_stat_dvcd','등록구분'),
								xtype		: 'lookupfield',
								name		: 'mmbr_stat_dvcd',
								width		: 160,
								labelWidth	: 60,
								editable	: false,
								lookupValue	: resource.lookup('mmbr_stat_dvcd'),
								readOnly	: true,
								hidden		: true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: Language.get('entr_date', '예약일자' ),
								name		: 'resv_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 160,
								labelWidth	: 60 ,
								margin		: '0 0 0 6',
								allowBlank	: false,

							},{	name		: 'resv_time',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								minValue	: '06:00',
								maxValue	: '22:30',
								increment	: 30,
								width		: 60,
								margin		: '1 0 0 0',
								allowBlank	: false,
							},{	fieldLabel	: '예약코치',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'drtr_name',
								pair		: 'drtr_idcd',
								allowBlank	: true,
								clearable	: false ,
								width		: 160,
								labelWidth	: 60,
								margin		: '0 0 0 70',
								allowBlank	: false,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: '메모사항',
								name		: 'memo',
								xtype		: 'textarea',
								width		: 456,
		//						hight		: 40,
								lavelWidth	: 60,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 0 0',
						items	: [
							{	fieldLabel	: Language.get('proc_date', '레슨일자' ),
								name		: 'proc_date',
								xtype		: 'datefield',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 160,
								labelWidth	: 60 ,
								margin		: '0 0 0 6',
							},{	name		: 'proc_time',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								minValue	: '06:00',
								maxValue	: '22:30',
								increment	: 30,
								width		: 60,
								margin		: '1 0 0 0',
								allowBlank	: true,
							},{	xtype		: 'lookupfield',
								name		: 'resv_stat_dvcd',
								width		: 70,
								editable	: false,
								lookupValue	: resource.lookup('resv_stat_dvcd'),
								fieldCls	: 'requiredindex',
								allowBlank	: false,
								listeners	: {
									change	: function() {
										var panel	= this.up('form'),
											pdate	= panel.down('[name=proc_date]').getValue(),
											ptime	= panel.down('[name=proc_time]').getValue(),
										pdrtr	= panel.down('[name=proc_drtr_idcd]').getValue();
										if(this.getValue()=='3'){
											if (panel.down('[name=proc_date]').getValue()==null||panel.down('[name=proc_date]').getValue()=='') {
												panel.down('[name=proc_date]').setValue(panel.down('[name=resv_date]').getValue());
												panel.down('[name=proc_time]').setValue(panel.down('[name=resv_time]').getValue());
											};
//											if (panel.down('[name=proc_drtr_idcd]').getValue()==null||panel.down('[name=proc_drtr_idcd]').getValue()=='') {
												panel.down('[name=proc_drtr_idcd]').setValue(panel.down('[name=drtr_idcd]').getValue());
												panel.down('[name=proc_drtr_name]').setValue(panel.down('[name=drtr_name]').getValue());
//											};
										}else {
											panel.down('[name=proc_date]').setValue(null);
											panel.down('[name=proc_time]').setValue(null);
											panel.down('[name=proc_drtr_idcd]').setValue(null);
											panel.down('[name=proc_drtr_name]').setValue(null);
										}
									}
								}
							},{	fieldLabel	: Language.get('qntt','레슨횟수'),
								xtype		: 'numericfield',
								name		: 'qntt',
								itemId		: 'qntt',
								width		: 160,
								labelWidth	: 60,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 2 0',
						items	: [
							{	fieldLabel	: '담당코치',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'proc_drtr_name',
								pair		: 'proc_drtr_idcd',
								allowBlank	: true,
								clearable	: false ,
								width		: 160,
								labelWidth	: 60,
								margin		: '0 0 0 6',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-user-popup',
									params	: { stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								}
							},{	name		: 'proc_drtr_idcd', xtype : 'textfield' , hidden : true
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [

						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
						]
					},{	name		: 'line_seqn', xtype : 'textfield' , hidden : true

					},

				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [
					me.createTab1()
				]
			}
		;
		return item;
	},
	createTab1 : function() {
		var me = this,
			item = {
				title	: '추가정보',
				name	: 'adon_info',
				xtype	: 'form-panel',
				dock	:'left',
				region	: 'center',
				layout	: 'vbox',
				autoScroll:true,
				fieldDefaults	: { width : 400, labelWidth : 100, labelSeparator : '' },
					items	: [
						{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
							]
						},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items	: [
							]
						}
					]
				}
			;
		return item;
	},
	imgCancle:function(){
		var form = this.up('form').up('[name=imge_info]');
		form.down('[name=image]').setSrc('');
		form.down('[name=item_imge]').setValue('');
		form.down('[name=files]').fileInputEl.dom.value = '';
	},
});