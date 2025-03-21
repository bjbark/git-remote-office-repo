//var offe_dvcd = '2'

Ext.define('module.workshop.print.basic.menumast.view.MenuMastWorkerEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-workshop-menu-worker-editor',
	height : 135,
	header : false,
	getStore : function() {
		return Ext.getStore( 'module.workshop.print.basic.menumast.store.MenuMastInvoice' );
	},
	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createWest() ] ;
		me.items = me.createTabs();
		me.callParent(arguments);
	},


	/**
	 *
	 */
	createWest : function () {
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			dock		: 'left',
			border		: 0,
			bodyStyle	: { padding: '5px' },
			width		: 330,
			fieldDefaults: { width : 300, labelWidth : 60, labelSeparator : '' },
			items		: [
				{	fieldLabel	: Language.get('', '상위메뉴' ),
					name		: 'prnt_name',
					pair		: 'prnt_idcd',
					xtype		: 'popupfield',
					editable	: false,
					enableKeyEvents : true,
					clearable	: true,
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					allowBlank	: false	,
					margin		: '15 0 5 0',
					popup		: {
						widget	: 'lookup-base-popup',
						select	: 'SINGLE',
						params	: { stor_grp : _global.stor_grp, line_stat : '0',prnt_idcd: '6000' },
						result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_idcd'));
						}
					}
				},{	name		: 'prnt_idcd', xtype	: 'textfield', hidden : true
				},{	fieldLabel	: Language.get('', '메뉴명' ),
					name		: 'clss_name',
					xtype		: 'textfield',
					fieldCls	: 'requiredindex',
					emptyText	: Const.invalid.emptyValue,
					allowBlank	: false	,
				},{	xtype : 'fieldset', layout: 'hbox', border : 0,margin : 0,
					items : [
						{	fieldLabel	: Language.get('', '순위' ),
							xtype		: 'numericfield',
							name		: 'dspl_rank',
							labelWidth	: 50,
							width		: 120,
						},{	fieldLabel	: Language.get('', '견적여부' ),
							xtype		: 'lookupfield',
							name		: 'esti_typl_yorn',
							editable	: false,
							value		: '0',
							labelWidth	: 80,
							width		: 170,
							lookupValue	: resource.lookup('yorn'),
						}
					]
				}
		 	]
		};
		return item;
	},

	/**
	 *
	 */
	createTabs : function () {
		var me = this,
			tabs = {
				xtype	: 'tabpanel',
				region	: 'center',
				plain	: true,
				margin	: 0 ,
				items	: [ me.createTab1() ]
			}
		;
		return tabs;
	},


	/**
	 *
	 */
	createTab1 : function() {
		var item = {
			title 			: '비고',
			xtype 			: 'form-panel',
			region			: 'west',
			border			: 0,
			bodyStyle		: { padding: '5px' },
			fieldDefaults	: { width : 315, labelWidth : 70, labelSeparator : '' },
			items			: [
				{	xtype	: 'fieldset',
					layout	: 'vbox' ,
					padding	: '0',
					border	: 0,
					margin	: '0 0 5 0',
					items	: [
						{	xtype 		: 'textarea',
							name 		: 'user_memo',
							height 		: 80,
							width 		: 625,
						}
					]
				}
			]
		}
	;
	return item;
	}

});
