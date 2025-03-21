Ext.define('module.prod.basic.wkctmast.view.WkctMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-wkctmast-editor',

	height : 285,
	layout : {
		type: 'border'
	},

	title			: Language.get('wkct_idcd','공정코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'wkct_idcd',

	initComponent: function(){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},

	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom',
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
				width			: 500,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 345, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('wkct_code','공정코드'),
								name		: 'wkct_code',
								xtype		: 'textfield',
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								width		: 285
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 55,
								margin		: '0 0 0 5'
							}
						]
					},{	fieldLabel	: Language.get('wkct_name','공정명'),
						xtype		: 'textfield',
						name		: 'wkct_name',
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
					},{	fieldLabel	: Language.get('wkct_stnm','공정약칭'),
						xtype		: 'textfield',
						name		: 'wkct_stnm'
					},{	fieldLabel	: Language.get('dept_name','소속부서'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'dept_name',
						pair		: 'dept_idcd',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-dept-popup',
							params : { stor_grp : _global.stor_grp , line_stat : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('dept_name'));
								pairField.setValue(records[0].get('dept_idcd'));
							}
						}
					},{	name : 'dept_idcd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get( 'labo_rate_name','임율'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'labo_rate_name',
						pair		: 'labo_rate_idcd',
						width		: 345,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-laborate-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								me.down('[name=labo_rate_idcd]').setValue(records[0].get('labo_rate_idcd'));
								nameField.setValue(records[0].get('labo_rate_name'));
								pairField.setValue(records[0].get('labo_rate_idcd'));
							}
						}
					},{	name : 'labo_rate_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get( 'otod_yorn','외주'),
								xtype		: 'lookupfield',
								name		: 'otod_yorn',
								itemId		: 'otod_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 195,
								listeners	:{
									change	: function(a,val,c){
										var form =	this.up('form'),
											cstm_name = form.down('[name=cstm_name]'),
											cstm_idcd = form.down('[name=cstm_idcd]');
										if(this.getValue()=='0'){
											cstm_name.hide();
											cstm_name.setValue('');
											cstm_idcd.setValue('');
										}else if(this.getValue()=='1'||this.getValue()=='' || this.getValue == null){
											cstm_name.show();
										}
									}
								}
							},{	fieldLabel	: Language.get('rslt_rept_yorn','실적관리'),
								xtype		: 'lookupfield',
								name		: 'rslt_rept_yorn',
								lookupValue	: resource.lookup('yorn'),
								labelWidth	: 55,
								width		: 150
							}
						]
					},{	fieldLabel	: Language.get('otod_cstm_name', '외주업체' ),
						name		: 'cstm_name',
						pair		: 'cstm_idcd',
						itemId		: 'cstm_idcd',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						popup		: {
							widget	: 'lookup-cstm-popup',
							select	: 'SINGLE',
							params	: {	stor_grp : _global.stor_grp, line_stat : '0', otod_cstm_yorn  : '1'
							},
							result	: function(records, nameField, pairField ) {
								nameField.setValue(records[0].get('cstm_name'));
								pairField.setValue(records[0].get('cstm_idcd'));
							},
						}
					},{	name	: 'cstm_idcd', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('stok_mngt_yorn', '재고 관리' ),
								xtype		: 'lookupfield',
								name		: 'stok_mngt_yorn',
								lookupValue	: resource.lookup('yorn'),
								width		: 195
							},{	fieldLabel	: Language.get('wkct_dvcd', '공정 구분' ),
								xtype		: 'lookupfield',
								name		: 'wkct_dvcd',
								hidden		: (_global.options.mes_system_type !='Frame'),
								lookupValue	: resource.lookup('wkct_dvcd'),
								labelWidth	: 55,
								width		: 150
							}
						]
					},{	xtype		: 'textfield',
						name		: 'change',
						hidden		: true
					}
				]
			}
		;
		return item;
	},

	createTabs : function () {
		var me = this,
			hidden = !(_global.hqof_idcd=='N1000iypkg'),
			item = {
				xtype	: 'tabpanel',
				region	: 'center',
				margin	: 0,
				plain	: true,
				items	: [ me.createTab1(), me.createTab2(hidden), me.createTab3(hidden), me.createTab4(hidden)]
			}
		;
		console.log(hidden);
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('user_memo','메모사항'),
				xtype		: 'form-panel',
				layout		: 'hbox',
				border		: 0 ,
				bodyStyle	: { padding: '5px' },
				items		: [
					{	fieldLabel	: '' ,
						name		: 'user_memo',
						xtype		: 'textarea',
						emptyText	: '메모사항을 적어주십시오',
						height		: 167,
						flex		: 1
					},{	fieldLabel	: '',
						name		: 'lookup_val',
						xtype		: 'textarea	',
						readOnly	: true,
						hidden		: true
					}
				]
			}
		;
		return item;
	},

	createTab2 : function(hidden) {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '외주처'),
			hidden	: hidden,
			xtype	: 'module-wkctmast-otod-lister',
		};
		return item;
	},

	createTab3 : function(hidden) {
		var  me = this;
		var item =
		{
			title	: Language.get( '' , '외주비'),
			hidden	: hidden,
			xtype	: 'module-wkctmast-otod-lister2',
		};
		return item;
	},


	createTab4 : function(hidden) {
		var me = this,
		item = {
			title		: Language.get('','추가정보'),
			xtype		: 'form-panel',
			layout		: 'vbox',
			border		: 0 ,
			bodyStyle	: { padding: '5px' },
			margin		: '10 0 0 0',
			items		: [
				{	fieldLabel	: '생산구분' ,
					margin		: '5 0 10 0',
					name		: '',
					xtype		: 'lookupfield',
					wight		: 100,
				},{	fieldLabel	: '작업구분' ,
					name		: '',
					margin		: '0 0 10 0',
					xtype		: 'lookupfield',
					wight		: 100,
				},{	fieldLabel	: '작업단위' ,
					name		: '',
					margin		: '0 0 10 0',
					xtype		: 'lookupfield',
					wight		: 100,
				},{	fieldLabel	: '수량단위' ,
					name		: '',
					margin		: '0 0 10 0',
					xtype		: 'lookupfield',
					wight		: 100,
				},{	fieldLabel	: '표준단가' ,
					name		: '',
					xtype		: 'textfield',
					wight		: 100,
				}
			]
		}
	;
	return item;
	}

});