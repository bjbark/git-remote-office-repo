Ext.define('module.basic.wrhszone.view.WrhsZoneEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-wrhszone-editor',

	height : 180,
	layout : {
	type: 'border'
	},

	title			: Language.get('','보관위치 정보'),
	collapsible 	: true			,
	collapsed		: true			,

	initComponent: function(config){
		var me = this;

		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
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
				width			: 400,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	name	: 'zone_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('zone_name','구역명'),
								xtype		: 'textfield',
								name		: 'zone_name',
								readOnly	: true,
								margin		: '0 5 0 0',
								width		: 240,
								required	: true,
								fieldCls	: 'requiredindex',
								emptyText	: '랙, 층, 칸을 입력하여주십시오.'
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								width		: 70,
								value		: '',
								margin		: '0 0 0 0',
								lookupValue	: resource.lookup('line_stat' ),
							}
						]
					},{	fieldLabel	: Language.get('zone_rack','랙'),
						xtype		: 'textfield',
						name		: 'zone_rack',
						enableKeyEvents: true ,
						listeners	: {
							change : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var panel = self.up('form');
									var rack = self.up('form').down('[name=zone_rack]').getValue();
									var flor = self.up('form').down('[name=zone_flor]').getValue();
									var colm = self.up('form').down('[name=zone_colm]').getValue();
									if(flor != ''&&rack!=''){
										flor = '-'+flor;
									}
									if(colm != ''){
										if(rack!=''){
											colm = '-'+colm;
										}else if(rack =='' && flor!=''){
												colm = '-'+colm;
										}
									}
									if (flor == '' || colm == '') {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									} else {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									}
//									panel.down('[name=zone_flor]').focus(true, 10);
								}else if (e.keyCode == e.ESC) {
							}
						}
					}
					},{	fieldLabel	: Language.get('zone_flor','층'),
						xtype		: 'textfield',
						name		: 'zone_flor',
						enableKeyEvents: true ,
						listeners	: {
							change : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var panel = self.up('form');
									var rack = self.up('form').down('[name=zone_rack]').getValue();
									var flor = self.up('form').down('[name=zone_flor]').getValue();
									var colm = self.up('form').down('[name=zone_colm]').getValue();
									if(flor != ''&&rack!=''){
										flor = '-'+flor;
									}
									if(colm != ''){
										if(rack!=''){
											colm = '-'+colm;
										}else if(rack =='' && flor!=''){
												colm = '-'+colm;
										}
									}
//									panel.down('[name=zone_colm]').focus(true, 10);
									if (flor == '' || colm == '') {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									} else {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									}
								}else if (e.keyCode == e.ESC) {
							}
						},
					}
					},{	fieldLabel	: Language.get('zone_colm','칸'),
						xtype		: 'textfield',
						name		: 'zone_colm',
						enableKeyEvents: true ,
						listeners	: {
							change : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB ) {
									var panel = self.up('form');
									var rack = self.up('form').down('[name=zone_rack]').getValue();
									var flor = self.up('form').down('[name=zone_flor]').getValue();
									var colm = self.up('form').down('[name=zone_colm]').getValue();
									if(flor != ''&&rack!=''){
										flor = '-'+flor;
									}
									if(colm != ''){
										if(rack!=''){
											colm = '-'+colm;
										}else if(rack =='' && flor!=''){
												colm = '-'+colm;
										}
									}
//									panel.down('[name=zone_colm]').focus(true, 10);
									if (flor == '' || colm == '') {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									} else {
									panel.down('[name=zone_name]').setValue(self.up('form').down('[name=zone_rack]').getValue() + flor + colm);
									}
								}else if (e.keyCode == e.ESC) {
								}
							}
						}
					}
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
					items	: [ me.createTab1() ]
				}
			;
			return item;
		},

		createTab1 : function() {
			var me = this,
				item = {
					title		: Language.get('user_memo','메모사항'),
					xtype		: 'form-panel',
					layout		: 'hbox',
					border		: 0,
					bodyStyle	: { padding: '5px' },
					items		: [
						{	fieldLabel	: '' 		,
							name		: 'user_memo',
							xtype		: 'textarea',
							emptyText	: '메모사항을 적어주십시오',
							height		: 90,
							flex		: 1
						},{	fieldLabel	: '' ,
							name		: 'lookup_val',
							xtype		: 'textarea'  ,
							readOnly	: true,
							hidden		: true
						}
					]
				}
			;
		return item;
	}
});