Ext.define('module.prod.cvic.cviclist.view.CvicListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-cviclist-search',

	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
			me.addonSearch()
		];
		me.callParent();
	},

	searchBasic : function() {
		var me = this,
			line = {
				xtype	: 'fieldset',
				border	: 0,
				style	: { borderColor : '#8C8C8C', borderStyle : 'solid' },
				region	: 'center',
				width	: '100%',
				height	: 40,
				margin	: '0 40 0 40',
				items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#000081', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype		: 'label'			,
								fieldCls	: 'requiredindex'	,
								text		: 'SEARCH  | '		,
								margin		: '5 10 0 0'		,
								style		: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name		: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 설비코드 또는 설비명을 입력하세요...',
								enableKeyEvents : true			,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]');
											searchButton.fireEvent('click', searchButton); //조회버튼클릭
										}
									}
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width : 40, height : 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			};
		return line;
	},
	addonSearch : function(){
		var me = this,
			line = {
				xtype			: 'fieldset',
				title			: '상세검색',
				collapsible		: true,
				collapsed		: false,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width: 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('cvic_kind_dvcd','설비종류'),
								xtype		: 'lookupfield',
								name		: 'cvic_kind_dvcd',
								labelWidth	: 99,
								width		: 245,
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('cvic_kind_dvcd')),
								value		: ''
							},{	fieldLabel	: Language.get('cvic_stat_dvcd','운전상태'),
								xtype		: 'lookupfield',
								name		: 'cvic_stat_dvcd',
								labelWidth	: 99,
								width		: 245,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('cvic_stat_dvcd' )),
								value		: ''
							},{	fieldLabel	: Language.get('wkct_name','설치공정'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'wkct_name',
								labelWidth	: 99,
								width		: 245,
								margin		: '0 2 0 0',
								pair		: 'wkct_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-wkct-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('wkct_name'));
										pairField.setValue(records[0].get('wkct_idcd'));
									}
								}
							},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true
							}
	 					]
					},{	xtype	: 'fieldset', layout: 'hbox',
						items	: [
							{	fieldLabel	: Language.get('dept_name','관리부서'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'dept_name',
								labelWidth	: 99,
								width		: 245,
								pair		: 'mngt_dept_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-dept-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('dept_name'));
										pairField.setValue(records[0].get('dept_idcd'));
									}
								}
							},{	name : 'mngt_dept_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('puch_cstm','구매거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								labelWidth	: 99,
								width		: 245,
								pair		: 'puch_cstm_idcd',
								clearable	: true,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-cstm-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'puch_cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: '분류기준',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'clss_name',
								pair		: 'clss_idcd',
								clearable	: true ,
								margin		: '0 2 0 0',
								width		: 245,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-clss-mast-popup',
									params	: { stor_grp : _global.stor_grp , line_stat : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('clss_name'));
										pairField.setValue(records[0].get('clss_idcd'));
										me.down('[name=lcls_idcd]').setValue(records[0].get('lcls_idcd'));
										me.down('[name=mcls_idcd]').setValue(records[0].get('mcls_idcd'));
										me.down('[name=scls_idcd]').setValue(records[0].get('scls_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if( val == '' || val == null ){
											me.down('[name=lcls_idcd]').reset();
											me.down('[name=mcls_idcd]').reset();
											me.down('[name=scls_idcd]').reset();
										}
									}
								}
							},{	name		: 'clss_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'lcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'mcls_idcd', xtype : 'textfield' , hidden : true
							},{	name		: 'scls_idcd', xtype : 'textfield' , hidden : true
							}
	 					]
					}
				]
			};
		return line;
	}
});