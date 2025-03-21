Ext.define('module.custom.dehansol.prod.workbook.view.WorkBookPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-workbook-popup',

	title		: '작업일지발행',
	closable	: true,
	autoShow	: true,
	width		: 310 ,
	height		: 150,
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
							fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
							items		: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('','발행기간'),
											xtype		: 'betweenfield',
											name		: 'invc_date1',
											pair		: 'invc_date2',
											labelWidth	: 70,
											width		: 170,
											margin		: '0 0 0 2',
											root		: true,
											value		: new Date()
										},{	xtype		: 'betweenfield',
											fieldLabel	:'~',
											name		: 'invc_date2',
											pair		: 'invc_date1',
											labelWidth	: 15,
											width		: 115,
											value		: new Date()
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('wkct', '공정' ),
											name		: 'wkct_name',
											pair		: 'wkct_idcd',
											margin		: '0 0 0 2',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											clearable	: true ,
											labelWidth	: 70,
											width		: 285,
											popup		: {
												widget	: 'lookup-wkct-popup',
												select	: 'SINGLE',
												params	: { stor_grp : _global.stor_grp, line_stat : '0' },
												result	: function(records, nameField, pairField ) {
													nameField.setValue(records[0].get('wkct_name'));
													pairField.setValue(records[0].get('wkct_idcd'));
												}
											}
										},{	name : 'wkct_idcd', xtype	: 'textfield', hidden : true
										}
									]
								}
							]
						}
					]
				}
			]
		};
		return form;
	},

	/**
	 * 확인 버튼 이벤트
	 */

	finishAction: function(){
		var me = this,
			baseform= me.down('form'),
			values	= baseform.getValues(),
			jrf		='Dehansol_Workbook.jrf',
			resId = _global.hq_id.toUpperCase()
		;

		var err_msg = "";
		var arg =	'invc_date1~'+values.invc_date1+'~invc_date2~'+values.invc_date2+'~wkct_idcd~'+values.wkct_idcd;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;

	}
});
