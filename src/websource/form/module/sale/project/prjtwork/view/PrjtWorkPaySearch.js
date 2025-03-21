Ext.define('module.sale.project.prjtwork.view.PrjtWorkPaySearch', { extend: 'Axt.form.Search',
	store	: 'module.sale.project.prjtwork.store.PrjtWorkInvoice',
	alias	: 'widget.module-prjtwork-paysearch',
	style	: 'padding-top : 1px;' ,

	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.items = [me.pagingItem()];
		me.callParent();
	},

	/**
	 * 라인1
	 */
	pagingItem : function () {
		var me = this,
		item = {
			xtype  : 'fieldset' ,
			margin : '0 0 0 0' ,
			items  : [
				{	xtype	: 'fieldcontainer',
					layout	: { type: 'vbox', align: 'stretch' },
					style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
					margin	: '3 0 3 0',
					width	: 150,
					items	: [
						{	text		: '결제구분' , xtype : 'label', style : 'text-align:center;'
						},{	name		: 'colt_dvcd',
							xtype		: 'lookupfield',
							lookupValue	: resource.lookup('colt_dvcd'),
							enableKeyEvents : true,
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var panel = self.up('form');
										panel.down('[name=colt_degr]').focus(true, 10);
									}
								}
							}
						}
					]
				},{	xtype	: 'fieldcontainer',
						layout	: { type: 'vbox', align: 'stretch' },
						style	: Const.borderLine.top +  Const.borderLine.bottom  +   Const.borderLine.right  ,
						margin	: '3 0 3 0',
						width	: 60,
						items	: [
							{	text		: '차수' , xtype : 'label', style : 'text-align:center;'
							},{	name		: 'colt_degr',
								xtype		: 'numericfield',
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER) {
											var panel = self.up('form');
											panel.down('[name=plan_date]').focus(true, 10);
										}
									}
								}
							}
						]
				},{	xtype	: 'fieldcontainer',
					layout	: { type: 'vbox', align: 'stretch' },
					width	: 100,
					style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
					margin	: '3 0 3 0',
					items	: [
						{	text		: '예정일자' , xtype : 'label', style : 'text-align:center;'
						},{	name		: 'plan_date',
							xtype		: 'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							enableKeyEvents : true,
							altFormats	: 'Y-m-d',
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var panel = self.up('form');
										panel.down('[name=plan_amnt]').focus(true, 10);
									}
								}
							}
						}
					]
				},{	xtype	: 'fieldcontainer'  ,
					layout	: { type: 'vbox', align: 'stretch' } ,
					style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.right  ,
					margin	: '3 0 3 0',
					hidden	: false,
					width	: 120 ,
					items	: [
						{	text		: '예정금액', xtype : 'label', style : 'text-align:center;'
						},{	name		: 'plan_amnt',
							xtype		: 'numericfield',
							enableKeyEvents : true,
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var a = self.up('form').down('[name=colt_dvcd]').getValue();
										var b = self.up('form').down('[name=colt_degr]').getValue();
										var c = self.up('form').down('[name=plan_date]').getValue();
										var d = self.up('form').down('[name=plan_amnt]').getValue();
										if(a =='' || a == null ){
											self.up('form').down('[name=colt_dvcd]').focus(true, 10);
											return;
										}
										if(b == '' || b == null  ){
											self.up('form').down('[name=colt_degr]').focus(true, 10);
											return;
										}
										if(c == '' || c == null){
											self.up('form').down('[name=plan_date]').focus(true, 10);
											return;
										}
										if(d =='' || d == null){
											self.up('form').down('[name=plan_amnt]').focus(true, 10);
											return;
										}
										if (a != '' && b != '' && c != '' && d !='') {
											me.appendItem({});
										}
									}
								}
							}
						}
					]

				}
			]
		}
		;
		return item;
	},
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record,
			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
		} else {
			me.down('[name=colt_dvcd]'	).setValue(record.get('colt_dvcd' ));
			me.down('[name=colt_degr]'	).setValue(record.get('colt_degr' ));
			me.down('[name=plan_date]'	).setValue(record.get('plan_date' ));
			me.down('[name=plan_amnt]'	).setValue(record.get('plan_amnt' ));

			if (config.append) {
				me.appendItem( { panel : config.panel });
			}
		}
	},
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			record		= undefined
			plan_date = Ext.Date.format(me.down('[name=plan_date]').getValue(),'Y-m-d')
		;
		record = Ext.create( store.model.modelName , {
			colt_dvcd: me.down('[name=colt_dvcd]').getValue(),
			colt_degr: me.down('[name=colt_degr]').getValue(),
			plan_date: plan_date,
			plan_amnt: me.down('[name=plan_amnt]').getValue(),
		});
		store.add(record);
		me.attachItem({ clear : true });
	}
});
