Ext.define('module.custom.hantop.prod.order.prodorder.view.ProdOrderDetail3Search',{ extend: 'Axt.form.Search',
	alias: 'widget.module-prodorder-detail3-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.addonSearch()
		];
		me.callParent();
	},

	addonSearch : function(){
		var me = this,
			line = {
				xtype		: 'fieldset',
				layout		: 'vbox',
				autoScroll	: true,
				border		: 0,
				bodyStyle	: { padding: '5px' },
				flex		: 100 ,
				fieldDefaults: { width : 280, labelWidth : 50 , margin : '5 5 0 0'},
				items			: [
					{	xtype : 'fieldset', layout: 'vbox', margin : '0 0 0 0', border : 0,
						items : [
							{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('ordr_numb','오더번호'),
										xtype		: 'textfield',
										name		: 'ordr_numb',
										width		: 160,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 60
									},{	fieldLabel	: Language.get('invc_numb','견적번호'),
										xtype		: 'textfield',
										name		: 'invc_numb',
										width		: 140,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										labelWidth	: 50
									},{	fieldLabel	: Language.get('scen_addr_1fst','시공주소'),
										xtype		: 'textfield',
										name		: 'scen_addr_1fst',
										width		: 500,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},
//									{	fieldLabel	: Language.get('bfsf_dvcd','틀짝망구분'),
//										xtype		: 'lookupfield',
//										name		: 'bfsf_dvcd',
//										lookupValue	: resource.lookup('bfsf_dvcd'),
//										editable	: false,
//										multiSelect	: true ,
//										width		: 130,
//										labelWidth	: 60,
//										margin		: '5 0 0 0',
//										listeners	: {
//											change	: function(){
//												me.selectAction();
//											}
//										}
//									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('brnd_name','브랜드'),
										xtype		: 'textfield',
										name		: 'brnd_name',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('ispl_name','설치위치'),
										xtype		: 'textfield',
										name		: 'ispl_name',
										width		: 145,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('cont_schd_date','현장출고일'),
										xtype		: 'textfield',
										name		: 'cont_schd_date',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('cofm_dttm','지시일자'),
										xtype		: 'textfield',
										name		: 'cofm_dttm',
										width		: 140,
										labelWidth	: 50,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{ xtype		: 'hiddenfield', name : 'line_seqn'
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('wdsf_rate_name','창형태'),
										xtype		: 'textfield',
										name		: 'wdsf_rate_name',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_widh','창짝(W)'),
										xtype		: 'numericfield',
										name		: 'item_widh',
										width		: 145,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_hght','창짝(H)'),
										xtype		: 'numericfield',
										name		: 'item_hght',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('cmpl_yorn','완료여부'),
										xtype		: 'lookupfield',
										name		: 'cmpl_yorn',
										lookupValue	: [['1','완료'],['5','오류'],['8','취소'],['9','보류']],
//										lookupValue	: resource.lookup('cmpl_yorn'),
										editable	: false,
										multiSelect	: true ,
										width		: 140,
										labelWidth	: 50,
										margin		: '5 0 0 0',
										listeners	: {
											change	: function(){
												me.selectAction();
											}
										}
									}
								]
							},{	xtype : 'fieldset', layout: 'hbox', margin : '0 0 0 0', border : 0 ,
								items : [
									{	fieldLabel	: Language.get('wndw_dirt_dvcd','창방향'),
										xtype		: 'textfield',
										name		: 'wndw_dirt_dvcd',
										width		: 160,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_widh_1fst','창짝(W1)'),
										xtype		: 'numericfield',
										name		: 'item_widh_1fst',
										width		: 145,
										labelWidth	: 55,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('item_hght_1fst','창짝(H1)'),
										xtype		: 'numericfield',
										name		: 'item_hght_1fst',
										width		: 150,
										labelWidth	: 60,
										readOnly	: true,
										fieldCls	: 'readonlyfield',
										margin		: '5 0 0 0'
									},{	fieldLabel	: Language.get('auto_yorn','자동여부'),
										xtype		: 'lookupfield',
										name		: 'auto_yorn',
										lookupValue	: resource.lookup('search_all').concat(resource.lookup('yorn')),
										editable	: false,
										width		: 140,
										labelWidth	: 50,
										margin		: '5 0 0 0',
										value		: '',
										listeners	: {
											change	: function(){
												me.selectAction();
											}
										}
									},{	xtype		: 'checkbox',
										fieldLabel	: Language.get('add','전체검색'),
										name		: 'add',
										checked		: false,
										style		: { color : 'blue' },
										margin		: '5 0 0 10',
										listeners	: {
											change	: function(){
												me.selectAction();
											}
										}
									}
								]
							}
						]
					}
				]
			};
		return line;
	},
	selectAction:function(){
		var	me		= this,
			add		= me.down('[name=add]').getValue(),
			tabPanel= Ext.ComponentQuery.query('module-prodorder-layout')[0].down('#detailpanel'),
			tindex	= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail,cofm_yorn,
			bfsf_dvcd = '',rn_dvcd = ''
		;
//		if(add){
//			cofm_yorn = '';
//		}else{
//			cofm_yorn = '1';
//		}
		switch (tindex) {
		case 1:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_bf')[0];
			bfsf_dvcd = 'bf';
			break;
		case 2:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_sf')[0];
			bfsf_dvcd = 'sf';
			break;
		case 3:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_mf')[0];
			bfsf_dvcd = 'mf';
			break;
		case 4:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_mc')[0];
			bfsf_dvcd = 'mc';
			break;
		case 5:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_gb')[0];
			bfsf_dvcd = 'gb';
			break;
		case 6:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_gl')[0];
			bfsf_dvcd = 'glss';
			break;
		case 7:
			detail = Ext.ComponentQuery.query('module-prodorder-lister-detail3_rn')[0];
			rn_dvcd = 'rn';
			break;
		default:
			detail = '';
			break;
		}
		if(detail!=''){
			var mask	= new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:detail
			}, Ext.merge(me.getValues(),{cofm_yorn:'1', add:add , bfsf_dvcd:bfsf_dvcd, rn_dvcd : rn_dvcd}, { stor_grp : _global.stor_grp }));
		}
	}
});