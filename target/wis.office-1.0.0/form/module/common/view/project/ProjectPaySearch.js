Ext.define('module.common.view.project.ProjectPaySearch', { extend: 'Axt.form.Search',
//	store	: 'module.prod.mold.moldmast.store.MoldMastInvoice',
	alias	: 'widget.common-project-paysearch',
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
						},{	name		:	'colt_dvcd',
							xtype		:	'lookupfield',
							lookupValue	:	resource.lookup('colt_dvcd'),
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
							},{	name		:	'colt_degr',
								xtype		:	'numericfield',
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
					width	: 150,
					style	: Const.borderLine.top +  Const.borderLine.bottom  +  Const.borderLine.left  +  Const.borderLine.right  ,
					margin	: '3 0 3 0',
					items	: [
						{	text		: '예정일자' , xtype : 'label', style : 'text-align:center;'
						},{	name		:	'plan_date',
							xtype		:	'datefield',
							format		: Const.DATE_FORMAT_YMD_BAR,
							enableKeyEvents : true,
							value		: new Date(),
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
					width	: 120 ,
					items	: [
						{	text		: '수금액', xtype : 'label', style : 'text-align:center;'
						},{	name		: 'move_loct_name',
							xtype		: 'textfield',
							readOnly	: false,
							editable	: false,
							allowBlank	: true,
							fieldCls	: false,
							format		: false,
							submitFormat: false,
							enableKeyEvents : true,
							listeners	: {
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER) {
										var qty = self.up('form').down('[name=move_date]').getValue();
										var t1 = self.up('form').down('[name=move_loct_dvcd]').getValue();
										var t2 = self.up('form').down('[name=move_loct_name]').getValue();
										var t3 = self.up('form').down('[name=move_purp_dvcd]').getValue();
										console.log(qty);
										if(qty =='' || qty == null ){
											self.up('form').down('[name=move_date]').focus(true, 10);
											return;
										}
										if(t1 == '' || t1 == null  ){
											self.up('form').down('[name=move_loct_dvcd]').focus(true, 10);
											return;
										}
										if(t2 == '' || t2 == null){
											self.up('form').down('[name=move_loct_name]').focus(true, 10);
											return;
										}
										if(t3 =='' || t3 == null){
											self.up('form').down('[name=move_purp_dvcd]').focus(true, 10);
											return;
										}
										if (qty != '' && t1 != '' && t2 != '' && t3 !='') {
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
			me.down('[name=mold_idcd]'	).setValue(record.get('mold_idcd' ));
			me.down('[name=mold_name]'	).setValue(record.get('mold_name' ));
			me.down('[name=mold_code]'	).setValue(record.get('mold_code' ));
			me.down('[name=mold_spec]'	).setValue(record.get('mold_spec' ));

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
			move_date = Ext.Date.format(me.down('[name=move_date]').getValue(),'Y-m-d')
		;
		record = Ext.create( store.model.modelName , {
			move_date		: move_date,
			move_loct_name	: me.down('[name=move_loct_name]').getValue(),
			move_loct_dvcd	: me.down('[name=move_loct_dvcd]').getValue(),
			move_purp_dvcd	: me.down('[name=move_purp_dvcd]').getValue(),
			move_memo		: me.down('[name=move_memo]').getValue(),
		});
		store.add(record);
		console.log(store);

		me.attachItem({ clear : true });
	}
});
