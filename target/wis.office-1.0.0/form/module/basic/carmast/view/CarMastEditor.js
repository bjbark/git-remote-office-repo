Ext.define('module.basic.carmast.view.CarMastEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-carmast-editor',

	height : 340,
	layout : {
		type: 'border'
	},

	title			: Language.get('','차량코드 정보'),
	collapsible 	: true,
	collapsed		: true,
	defaultFocus	: 'car_idcd',

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
				width			: 310,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 500, labelWidth : 60, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '1 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('cars_code','차량코드'),
								name		: 'cars_code',
								xtype		: 'textfield',
								allowBlank	: false,
								width		: 185
							},{	xtype		: 'lookupfield',
								name		: 'line_stat',
								lookupValue	: resource.lookup('line_stat'),
								width		: 65,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('cars_numb','차량번호'),
								xtype		: 'textfield',
								name		: 'cars_numb',
								width		: 255
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('cars_year_prod','년식'),
								xtype		: 'textfield',
								name		: 'cars_year_prod',
								width		: 255,
								enforceMaxLength	: true,
								maxLength	: 4,
								listeners	:{
									change:function(val){
										val.setValue(val.getValue().toString().replace( /[^0-9]/g, '' ));
									},
									blur:function(val){
										var d = Ext.Date.format(new Date(), 'Ymd')
											v = d.substr(0,4)
										;
										if(Number(val.getValue()) > Number(v)){
											Ext.Msg.alert('알림','년식을 다시 입력해주십시오.');
											val.setValue('');
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('puch_date','구입일자'),
								name		: 'puch_date',
								xtype		: 'datefield',
								width		: 255,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								listeners	: {
									blur : function(){
										var d  = this.getValue()
											editor = Ext.ComponentQuery.query('module-carmast-editor')[0]
										;
										editor.down('[name=insp_date]').setMinValue(d);
										editor.down('[name=expr_date]').setMinValue(d);
										editor.down('[name=paid_date]').setMinValue(d);
										editor.down('[name=insu_open_date]').setMinValue(d);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('insp_date','검사일'),
								name		: 'insp_date',
								xtype		: 'datefield',
								width		: 255,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							,{	fieldLabel	: Language.get('runn_dvcd','운행구분'),
								xtype		: 'lookupfield',
								name		: 'runn_dvcd',
								lookupValue	: resource.lookup('runn_dvcd'),
								width		: 255
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('nwek_name','차주'),
								name		: 'nwek_name',
								xtype		: 'textfield',
								width		: 150
							},{	xtype		: 'textfield',
								name		: '',
								width		: 100,
								margin		: '0 0 0 5'
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('load_volm','적재량'),
								xtype		: 'numericfield',
								name		: 'load_volm',
								width		: 255,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('crty_bacd','차종'),
								xtype		: 'popupfield',
								name		: 'base_name',
								pair		: 'base_code',
								width		: 255,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-base-popup',
									params : { stor_grp : _global.stor_grp , prnt_idcd : '3105', line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							}
						]
					},{	xtype	: 'textfield', name : 'base_code', hidden : true,
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 3 0',
						items	: [
							{	fieldLabel	: Language.get('cars_alis','차량명'),
								name		: 'cars_alis',
								xtype		: 'textfield',
								width		: 255
							}
						]
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
				region	: 'center'	,
				margin	: 0	,
				plain	: true,
				items	: [ me.createTab1(),me.createTab2()]
			}
		;
		return item;
	},

	createTab1 : function() {
		var me = this,
			item = {
				title		: Language.get('','할부정보'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0	,
				bodyStyle	: { padding: '5px', margin : '7 0 5 0'},
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('inst_totl_amnt','할부총액'),
								xtype		: 'numericfield',
								name		: 'inst_totl_amnt',
								width		: 200,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							},{	fieldLabel	: Language.get('inst_mont','할부개월'),
								xtype		: 'numericfield',
								name		: 'inst_mont',
								labelWidth	: 130,
								width		: 280,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('','월납부금'),
								xtype		: 'numericfield',
								name		: 'monh_paid_amnt',
								width		: 200,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							},{	fieldLabel	: Language.get('paid_date','납부일'),
								xtype		: 'datefield',
								name		: 'paid_date',
								labelWidth	: 130,
								width		: 280,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('expr_date','만기일자'),
								name		: 'expr_date',
								xtype		: 'datefield',
								width		: 200,
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('inst_bank_name','할부금융'),
								xtype		: 'textfield',
								name		: 'inst_bank_name',
								labelWidth	: 130,
								width		: 280,
							}
						]
					}
				]
			}
		;
		return item;
	},


	createTab2 : function() {
		var me = this,
			item = {
				title		: Language.get('','보험가입정보'),
				xtype		: 'form-panel',
				layout		: 'vbox',
				border		: 0	,
				bodyStyle	: { padding: '5px', margin : '7 0 5 0'},
				items		: [
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('insu_amnt','보험금액'),
								xtype		: 'numericfield',
								name		: 'insu_amnt',
								width		: 200,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							},{	fieldLabel	: Language.get('insu_dvcd','보험구분'),
								xtype		: 'lookupfield',
								name		: 'insu_dvcd',
								lookupValue	: resource.lookup('insu_dvcd'),
								labelWidth	: 130,
								width		: 280,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('insu_trff','보험요율'),
								xtype		: 'numericfield',
								name		: 'insu_trff',
								width		: 200,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							},{	fieldLabel	: Language.get('insu_open_date','보험개시일'),
								xtype		: 'datefield',
								name		: 'insu_open_date',
								labelWidth	: 130,
								width		: 280,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								listeners	: {
									blur : function(){
										var d  = this.getValue()
											editor = Ext.ComponentQuery.query('module-carmast-editor')[0]
										;
										editor.down('[name=insu_expr_date]').setMinValue(d);
										editor.down('[name=frst_date]').setMinValue(d);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('insu_expr_date','보험만기일'),
								name		: 'insu_expr_date',
								xtype		: 'datefield',
								width		: 200,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('paid_mthd_dvcd','납입구분'),
								xtype		: 'lookupfield',
								name		: 'paid_mthd_dvcd',
								lookupValue	: resource.lookup('paid_mthd_dvcd'),
								labelWidth	: 130,
								width		: 280,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('insu_cmpy_name','보험사'),
								name		: 'insu_cmpy_name',
								xtype		: 'textfield',
								width		: 200,
							},{	fieldLabel	: Language.get('insu_drtr_name','담당자'),
								xtype		: 'textfield',
								name		: 'insu_drtr_name',
								labelWidth	: 130,
								width		: 280,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('tele_numb','전화번호'),
								name		: 'tele_numb',
								xtype		: 'textfield',
								width		: 200,
								maxLength : 20,
								enforceMaxLength: true, // 입력란 길이 제한
								regex: /^[0-9,-]{0,30}$/,
								regexText: '숫자와 - 를 포함한 전화번호 형식에 맞춰 작성해주십시오.',
								validator: function(v) {
									return /^[0-9,-]{0,30}$/.test(v)?true:"오류";
								}
							},{	fieldLabel	: Language.get('hdph_numb','핸드폰번호'),
								xtype		: 'textfield',
								name		: 'hdph_numb',
								labelWidth	: 130,
								width		: 280,
								maxLength : 20,
								enforceMaxLength: true, // 입력란 길이 제한
								regex: /^[0-9,-]{0,30}$/,
								regexText: '숫자와 - 를 포함한 전화번호 형식에 맞춰 작성해주십시오.',
								validator: function(v) {
									return /^[0-9,-]{0,30}$/.test(v)?true:"오류";
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('emgc_tele_numb','비상전화'),
								name		: 'emgc_tele_numb',
								xtype		: 'textfield',
								width		: 200,
								maxLength : 20,
								enforceMaxLength: true, // 입력란 길이 제한
								regex: /^[0-9,-]{0,30}$/,
								regexText: '숫자와 - 를 포함한 전화번호 형식에 맞춰 작성해주십시오.',
								validator: function(v) {
									return /^[0-9,-]{0,30}$/.test(v)?true:"오류";
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('frst_date','1회일자'),
								name		: 'frst_date',
								xtype		: 'datefield',
								width		: 200,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								listeners	: {
									blur : function(){
										var d  = this.getValue()
											editor = Ext.ComponentQuery.query('module-carmast-editor')[0]
										;
										editor.down('[name=secd_date]').setMinValue(d);
									}
								}
							},{	fieldLabel	: Language.get('frst_amnt','1회금액'),
								xtype		: 'numericfield',
								name		: 'frst_amnt',
								labelWidth	: 130,
								width		: 280,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
										}
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 7 0',
						items	: [
							{	fieldLabel	: Language.get('secd_date','2회일자'),
								name		: 'secd_date',
								xtype		: 'datefield',
								width		: 200,
								value		: new Date(),
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
							},{	fieldLabel	: Language.get('secd_amnt','2회금액'),
								xtype		: 'numericfield',
								name		: 'secd_amnt',
								labelWidth	: 130,
								width		: 280,
								listeners	:{
									blur:function(val){
										var v = Number(val.getValue());
										if(v < 0){
											val.setValue(0);
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



});