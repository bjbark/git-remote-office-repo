Ext.define('module.user.userauth.view.UserAuthSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-userauth-search',

	initComponent: function(){
		var me =this;
		me.items = [me.searchBasic(),me.createLine1()];
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = { xtype	: 'module-common-searchBar' }
		;
		return line;
	},

	createLine1 : function(){
		var line = {
			xtype		: 'fieldset',
			items		: [
				{	fieldLabel	: Language.get('dept_name', '부서' ),
					name		: 'dept_name',
					pair		: 'dept_idcd',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					width		: 200 ,
					allowBlank	: true,
					emptyText	: Const.infoNull.queryAll,
					clearable	: true,
					popup		: {
						select : 'SINGLE',
						widget : 'lookup-dept-popup',
						params : { stor_grp : _global.stor_grp  },
						result : function(records, nameField, pairField ){
							nameField.setValue(records[0].get('dept_name'));
							pairField.setValue(records[0].get('dept_idcd'));
						//, stor_id : this.up('form').down('[name=stor_id]').getValue()
						}
					}
				},{	xtype : 'textfield',  name : 'dept_idcd' , hidden: true
				}
			]
		};
		return line;
	}
});