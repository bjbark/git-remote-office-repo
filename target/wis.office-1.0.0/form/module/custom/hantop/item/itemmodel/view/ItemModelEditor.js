Ext.define('module.custom.hantop.item.itemmodel.view.ItemModelEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-itemmodel-editor',

	height : 340,
//	height : 350,
	layout : {
		type: 'border'
	},
	border:0,
	title			: Language.get('','브랜드별 모델 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'wndw_idcd',

	initComponent: function(config){
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.items = me.createTabs();
		me.callParent(arguments);
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action , cls: 'button-style'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action , cls: 'button-style'},
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
				width			: 270,
				border			: 0,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 250, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	fieldLabel	: Language.get('brnd_bacd','브랜드'),
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						editable	: false,
						name		: 'brnd_name',
					},{	fieldLabel	: Language.get('wdgr_idcd','창호그룹'),
						xtype		: 'textfield',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						editable	: false,
						name		: 'wdgr_name',
					},{	fieldLabel	: Language.get('wndw_modl_code','모델코드'),
						xtype		: 'textfield',
						editable	: false,
						allowBlank	: false,
						name		: 'wndw_modl_code',
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						listeners	:{
							change	: function(){
								var	butn_yorn = me.down('[name=butn_yorn]').getValue(),
									wndw_modl_idcd = me.down('[name=wndw_modl_idcd]')
								;
								if(butn_yorn==1){
									wndw_modl_idcd.setValue(this.getValue());
								}
							}
						}
					},{	fieldLabel	: Language.get('modl_name','모델명'),
						xtype		: 'textfield',
						editable	: false,
						name		: 'modl_name',
					},{	fieldLabel	: Language.get('pdgr_name','제품군명'),
						xtype		: 'popupfield',
						name		: 'pdgr_name',
						pair		: 'pdgr_bacd',
						hidden		: true,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-base-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' , prnt_idcd : '3101' },
							result	: function(records, nameField, pairField) {
								var panel1 = nameField.up('form');
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
							}
						}
					},{	xtype	: 'hiddenfield'	, name : 'pdgr_bacd'
					},{	xtype	: 'textfield'	, name : 'brnd_bacd',hidden : true,	// 브랜드ID
					},{	xtype	: 'textfield'	, name : 'wdgr_idcd',hidden : true,	// 창호그룹ID
					},{	xtype	: 'textfield'	, name : 'wndw_itid',hidden : true,	// 창호품목ID
					},{	xtype	: 'textfield'	, name : 'butn_yorn',hidden : true,	// 확인용
					},{	xtype	: 'textfield'	, name : 'wndw_modl_idcd',hidden : true,	// 창호모델ID
					}
				]
			}
		;
		return item;
	},
	createTabs : function () {
		var me = this,
			item = {
				xtype	: 'panel',
				region	: 'center'	,
				autoScroll	: true,
				border	: 0,
				margin	: 0	,
				items	: [me.createTab1()]
		}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
		item = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: 0,
			fieldDefaults	: { width : 275, labelWidth : 85, labelSeparator : '' },
				items	: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0 ,margin : '5 0 0 0',
						items	: [
							{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdbf_item_name','BF품목'),
										xtype		: 'popupfield',
										name		: 'wdbf_item_name',
										pair		: 'wdbf_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'BF',mngt_sbsc_idcd:'000001',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdbf_itid'
									},{	fieldLabel	: Language.get('wdbf_widh','BF폭'),
										xtype		: 'numericfield',
										name		: 'wdbf_widh',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdbf_hght','BF높이'),
										xtype		: 'numericfield',
										name		: 'wdbf_hght',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdbf_rail_hght','BF레일높이'),
										xtype		: 'numericfield',
										name		: 'wdbf_rail_hght',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdbf_auto_cutt_yorn','BF자동절단'),
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('yorn'),
										name		: 'wdbf_auto_cutt_yorn',
										width		: 130,
										labelWidth	: 70,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdbf_auto_weld_yorn','BF자동용접'),
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('yorn'),
										name		: 'wdbf_auto_weld_yorn',
										width		: 130,
										labelWidth	: 70,
										minValue	: 0
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdsf_itid','SF품목'),
										xtype		: 'popupfield',
										name		: 'wdsf_item_name',
										pair		: 'wdsf_itid',
										width		: 250,
										popup		: {
											select	: 'SINGLE',
											widget	: 'lookup-item-popup',
											params	: { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'SF',mngt_sbsc_idcd:'000001',add:'1' },
											result	: function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype		: 'hiddenfield' , name : 'wdsf_itid'
									},{	fieldLabel	: Language.get('wdsf_widh','SF폭'),
										xtype		: 'numericfield',
										name		: 'wdsf_widh',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdsf_hght','SF높이'),
										xtype		: 'numericfield',
										name		: 'wdsf_hght',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdsf_auto_cutt_yorn','SF자동절단'),
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('yorn'),
										name		: 'wdsf_auto_cutt_yorn',
										width		: 130,
										labelWidth	: 70,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdsf_auto_weld_yorn','SF자동용접'),
										xtype		: 'lookupfield',
										lookupValue	: resource.lookup('yorn'),
										name		: 'wdsf_auto_weld_yorn',
										width		: 130,
										labelWidth	: 70,
										minValue	: 0
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdmc_item_name','MC품목'),
										xtype		: 'popupfield',
										name		: 'wdmc_item_name',
										pair		: 'wdmc_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'MC',mngt_sbsc_idcd:'000001',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdmc_itid'
									},{	fieldLabel	: Language.get('wdmc_tick','MC두께'),
										xtype		: 'numericfield',
										name		: 'wdmc_tick',
										width		: 130,
										minValue	: 0
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdmf_item_name','MF품목'),
										xtype		: 'popupfield',
										name		: 'wdmf_item_name',
										pair		: 'wdmf_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'MF',mngt_sbsc_idcd:'000001',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdmf_itid'
									},{	fieldLabel	: Language.get('wdmf_hght','MF높이'),
										xtype		: 'numericfield',
										name		: 'wdmf_hght',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdmf_topp_clmm','MF상부걸림'),
										xtype		: 'numericfield',
										name		: 'wdmf_topp_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdmf_bttm_clmm','MF하부걸림'),
										xtype		: 'numericfield',
										name		: 'wdmf_bttm_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('wdmf_side_clmm','MF가로보정'),
										xtype		: 'numericfield',
										name		: 'wdmf_side_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('moss_rail_hght','BF방충망레일'),
										xtype		: 'numericfield',
										name		: 'moss_rail_hght',
										width		: 130,
										minValue	: 0
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdgb_item_name','GB품목'),
										xtype		: 'popupfield',
										name		: 'wdgb_item_name',
										pair		: 'wdgb_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'GB',mngt_sbsc_idcd:'000001',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdgb_itid'
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdbf_rein_name','BF보강재'),
										xtype		: 'popupfield',
										name		: 'wdbf_rein_name',
										pair		: 'wdbf_rein_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'BF',mngt_sbsc_idcd:'000002',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdbf_rein_itid'
									},{	fieldLabel	: Language.get('topp_clmm','상부걸림'),
										xtype		: 'numericfield',
										name		: 'topp_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('bttm_clmm','하부걸림'),
										xtype		: 'numericfield',
										name		: 'bttm_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('side_clmm','측부걸림'),
										xtype		: 'numericfield',
										name		: 'side_clmm',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('glss_fixh_hght','유리고정턱높이'),
										xtype		: 'numericfield',
										name		: 'glss_fixh_hght',
										width		: 130,
										minValue	: 0
									},{	fieldLabel	: Language.get('ssbr_hght','SS바높이'),
										xtype		: 'numericfield',
										name		: 'ssbr_hght',
										width		: 130,
										minValue	: 0
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdsf_rein_itid','SF보강재'),
										xtype		: 'popupfield',
										name		: 'wdsf_rein_name',
										pair		: 'wdsf_rein_itid',
										width		: 250,
										popup: {
											select : 'SINGLE',
											widget : 'lookup-item-popup',
											params : { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'SF',mngt_sbsc_idcd:'000002',add:'1' },
											result : function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdsf_rein_itid'
									},{	fieldLabel	: Language.get('athd_csvl','자동핸들보정'),
										xtype		: 'numericfield',
										name		: 'athd_csvl',
										width		: 130,
									},{	fieldLabel	: Language.get('mnhd_csvl','수동핸들보정'),
										xtype		: 'numericfield',
										name		: 'mnhd_csvl',
										width		: 130,
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
									{	fieldLabel	: Language.get('wdsf_rein_itid','MF보강재'),
										xtype		: 'popupfield',
										name		: 'wdmf_rein_name',
										pair		: 'wdmf_rein_itid',
										width		: 250,
										popup		: {
											select	: 'SINGLE',
											widget	: 'lookup-item-popup',
											params	: { stor_grp : _global.stor_grp , line_stat : '0' , mngt_sbsc_valu : 'MF',mngt_sbsc_idcd:'000002',add:'1' },
											result	: function(records, nameField, pairField) {
												var panel1 = nameField.up('form');
												nameField.setValue(records[0].get('item_name'));
												pairField.setValue(records[0].get('item_name'));
											}
										}
									},{	xtype	: 'hiddenfield' , name : 'wdmf_rein_itid'
									}
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
								items	: [
								]
							}
						]
					}
				]
			}
		;
		return item;
	}
});