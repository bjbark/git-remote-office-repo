Ext.define('module.project.hostddns.view.HostDdnsEditor', { extend: 'Axt.form.Editor'

	,alias: 'widget.module-hostddns-editor'
	,height : 275
	,layout : {
		type: 'border'
	}
	,title : 'Data Base Connection Information'
	,collapsible : true
	,collapsed : true
	,defaultFocus : 'bonsa_nm'
	,initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createWest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me		= this,
			item	= {
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
			item = {
				xtype	: 'form-panel',
				dock	: 'left',
				width	: 400,
				bodyStyle: { padding: '5px' },
				fieldDefaults: { width : 315, labelWidth : 70, labelSeparator : '' },
				items	: [
					{
						xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{
								fieldLabel : 'Conn. ID',
								xtype      : 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name       : 'ddn_id',
								editable   : true ,
								clearable  : false,
								readOnly   : true,
								fieldCls   : 'requiredindex',
								width      : 210 ,
								popup      : {
									widget : 'lookup-bonsa-popup',
									select : 'SINGLE',
									params : { row_state : 0 , bonsa_sts : 1000 },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('bonsa_id'));
									}
								}
							},{
								name       : 'ddn_gb',
								xtype      : 'textfield',
								width      : 100,
								readOnly   : true,
								fieldCls   : 'requiredindex' ,
								margin : '0 0 0 5',
								lookupValue : resource.getList('ddn_gb' )
							}
						]
					},{	fieldLabel : 'Conn. Name' , name : 'ddn_nm', xtype : 'textfield'
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{
								fieldLabel : 'Host',
								xtype      : 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name       : 'host_cd',
								pair       : 'host_id',
								emptyText  : Const.infoNull.queryAll,
								clearable  : false,
								readOnly   : false,
								fieldCls   : 'requiredindex',
								width      : 210 ,
								popup      : {
									widget : 'lookup-hostinfo-popup',
									select : 'SINGLE',
									params : { row_state : 0 },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('host_cd'));
										pairField.setValue(records[0].get('host_id'));
									}
								}
								},{	name		: 'host_id', xtype : 'textfield' , hidden : true
								},{	name		: 'host_conn_port',
									xtype		: 'textfield',
									width		: 100,
									fieldCls	: 'requiredindex',
									margin		: '0 0 0 5'
								}
						]
					},{	xtype : 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items : [
							{	fieldLabel  : 'DB Name'   ,
								name		: 'host_path', xtype : 'textfield' ,
								width       : 210
							},{	name        : 'provider',
								xtype       : 'lookupfield',
								width       : 100,
								lookupValue : resource.lookup('provider' ),
								fieldCls    : 'requiredindex' ,
								margin		: '0 0 0 5'
							}
						]
				},{	fieldLabel : 'Account'   , name : 'host_conn_acct', xtype : 'textfield'
				},{	fieldLabel : 'Password'  , name : 'host_conn_pwd', xtype : 'textfield'
				},{	fieldLabel : 'Pool Time' , name : 'pooltime', xtype : 'textfield'
				},{	fieldLabel : 'Max Conn.' , name : 'maxcount', xtype : 'textfield'
				}
			]
		};// , me.createTabs()
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			item = {
				xtype : 'tabpanel',
				region : 'center',
				margin : 0 ,
				plain: true,
				items: [ me.createTab1()] //, me.createTab2()
			};
		return item;
	},


	/**
	* 메모사항
	*/
	createTab1 : function() {
		var me   = this,
			item = {
				title	 : '메모사항',
				xtype 	 : 'form-panel' ,
				layout 	 : 'hbox',
				border 	 : 0 ,
				bodyStyle : { padding: '5px' },
				items	 : [
					{
						name       : 'user_memo' ,
						xtype      : 'textarea',
						height     : 190 ,
						maxLength  : 200 ,
						flex       : 1
					}
				]
			}
		;
		return item;
	}

});


