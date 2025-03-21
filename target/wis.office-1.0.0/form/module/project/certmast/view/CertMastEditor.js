Ext.define('module.project.certmast.view.CertMastEditor', { extend: 'Axt.form.Editor' ,
	alias		: 'widget.module-certmast-editor' ,
	height		: 245,

	layout		: {
		type	: 'border'
	},
	collapsible	: true,
	collapsed	: true ,

	insertFocus	: 'cert_name',
	modifyFocus	: 'cert_name',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype	: 'toolbar',
				dock	: 'bottom',
				items	: [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' },
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' }, '-'
				]
			};
		return item;
	},

	/**
	 * 왼쪽 메뉴
	 */
	createWest : function () {
		var me = this,
			item =
				{	xtype	: 'form-panel',
					dock	: 'left',
					width	: 330,
					bodyStyle: { padding: '5px' },
					fieldDefaults: { width : 315, labelWidth : 60, labelSeparator : '' },
					items	: [
						{	xtype		: 'fieldset'
							, layout	: 'hbox'
							, padding	:'0'
							, border	: 0
							, margin	: '0 0 5 0',
							items : [
								{	fieldLabel : '설치코드' ,
									name       : 'cert_idcd',
									xtype      : 'textfield'     ,
									readOnly   : true,
									fieldCls   : 'requiredindex',
									width      : 180
								},{	name       : 'cert_stat_dvcd',
									xtype      : 'lookupfield',
									editable   : false  ,
									width      : 70 ,
									margin     : '0 0 0 5',
									lookupValue : resource.getList('cert_stat_dvcd' )

								},{	name       : 'line_stat',
									xtype      : 'lookupfield',
									width      : 55 ,
									editable   : false,
									margin     : '0 0 0 5',
									lookupValue : resource.lookup('line_stat' )
								}
							]
						},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
							items : [
								{	fieldLabel	: '설치암호' ,
									name		: 'cert_pswd',
									xtype		: 'textfield',
									fieldCls	: 'requiredindex' ,
									allowBlank	: false,
									width		: 180  ,
								},{	name		: 'store_id',
									xtype		: 'textfield' ,
									readOnly	: true ,
									fieldCls	:  'readonlyfield',
									margin		: '0 0 0 5',
									width		: 130
								}
							]
						},{	fieldLabel	: '설치명칭' , name : 'cert_name', xtype : 'textfield' , allowBlank  : false
						},{	xtype		: 'fieldset'
							, layout	: 'hbox'
							, padding	:'0'
							, border	: 0
							, margin	: '0 0 5 0'
							, items		: [
								{	xtype		: 'popupfield',
									editable	: true,
									enableKeyEvents : true,
									name		: 'user_name',
									pair		: 'user_idcd',
									fieldLabel	: '사용자',
									allowBlank	: false,
									clearable	: false,
									width		: 200  ,
									popup		: {
										select	: 'SINGLE',
										widget	: 'lookup-user-popup',
										params	: { store_gp : _global.store_gp, line_stat : 0 },
										result	: function(records, nameField, pairField ){
											nameField.setValue(records[0].get('user_name'));
											pairField.setValue(records[0].get('user_idcd'));
										}
									}
								},{	name		: 'dsse_yorn',
									fieldLabel	: '폐기',
									xtype		: 'lookupfield',
									labelWidth	: 40,
									editable	: false  ,
									width		: 110 ,
									margin		: '0 0 0 5',
									lookupValue	: resource.getList('yorn' )
								},{	xtype		: 'textfield',
									name		: 'user_idcd',
									readOnly	: true ,
									fieldCls	: 'readonlyfield',
									margin		: '0 0 0 5',
									width		: 110,
									hidden		: true
								}
							]
						},{fieldLabel	: '설치일시' ,
							xtype		: 'textfield',
							name		: 'used_dttm',
							editable	: false ,
							readOnly	: true ,
							fieldCls	: 'readonlyfield'
						}
					]
				};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this, item =
			{	xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0 ,
				plain	: true,
				items	: [ me.createTab1() ]  // me.createTab1()),  me.createTab2(), me.createTab3(
			};
		return item;
	},

	/**
	 * 메모사항
	 */
	createTab1 : function() {
		var me = this,
		item = {
			title		: '메모사항',
			xtype		: 'form-panel' ,
			layout		: 'hbox',
			border		: 0 ,
			bodyStyle	: { padding: '5px' },
			items		: [
				{	name		: 'user_memo' ,
					xtype		: 'textarea',
					height		: 160 ,
					maxLength	: 2000 ,
					flex		: 1
				}
			]
		}
		;
		return item;
	}


});


