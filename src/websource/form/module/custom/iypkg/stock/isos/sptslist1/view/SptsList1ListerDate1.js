Ext.define('module.custom.iypkg.stock.isos.sptslist1.view.SptsList1ListerDate1', { extend: 'Axt.form.Panel',
	alias		: 'widget.module-sptslist1-lister-date1',

	initComponent: function () {
		var me = this;
		me.items = [me.datePanel()];
		me.callParent();
	},

	datePanel : function(){
		var me = this,
		item =	{
			xtype 	: 'panel',
			layout	: 'vbox',
			height	: '100%',
			id		: 'test',
			border	: 0,
			listeners : {
				render : function(c) {
					var innerCt = me.id.concat('-innerCt');
					Ext.get(innerCt).addCls('text-inner');
				}
			},
			items	: [
				{	xtype	: 'panel',
					name	: '',
					width	: '100%',
					height	: '100%',
					border	: 0,
					items	: [
						{	xtype	: 'label',
							width	: '100%',
							height	: '100%',
							name	: 'date',
							style	: 'text-align:center; font-size:2.3em !important;'
						},{	xtype	: 'textfield',
							name	: 'date1',
							value	: '',
							hidden	: true,
							listeners	: {
								change : function(){
									var val  = this.getValue();
									this.up('panel').down('[name=date]').update(val.substr(2,2)+'년<br>'+val.substr(4,2)+'월<br>'+val.substr(6,2)+'일');
								}
							}
						}
					]
				}
			]
		};
		return item;
	}

});
