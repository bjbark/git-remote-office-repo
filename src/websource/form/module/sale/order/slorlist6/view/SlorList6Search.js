Ext.define('module.sale.order.slorlist6.view.SlorList6Search', { extend: 'Axt.form.Search',


	alias: 'widget.module-slorlist6-search',
	/**
	 *
	 */
	initComponent: function(){
		var me = this;
		me.items = [
			me.searchBasic(),
//			me.createLine1(),
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
						margin 	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label'			,
								fieldCls: 'requiredindex'	,
								text	: 'SEARCH  | '		,
								margin	: '5 10 0 0'		,
								style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
							},{	name	: 'find_name'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '조회할 발주일자 또는 거래처코드를 입력하세요...',
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
				collapsed		: true,
				layout			: 'vbox',
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 5 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox', margin	: '0 40 3 40',
						items : [
							{	xtype		: 'lookupfield',
								name		: 'date',
								editable	: false,
								width		: 120,
								margin		: '0 0 0 5',
								lookupValue	: [['1','생성일자'],['2','발주일자'],['3','협력사 납기일자']],
								value		: '1'
							},{	xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								width		: 100,
								margin		: '0 0 0 2',
								root		: true,
								value		: ''
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								labelWidth	: 15,
								width		: 115,
								value		: ''
							},{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name',
								pair		: 'item_idcd',
								width		: 315,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								},
								listeners	: {
									change	: function() {
										var val = this.getValue();
										if(val=='' || val == null){
											me.down('[name=item_idcd]').reset();
										}
									}
								}
							},{	fieldLabel	: Language.get('line_clos','마감상태'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('line_clos')),
								width		: 207
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', margin	: '0 40 3 40',
						items : [
							{	xtype		: 'lookupfield',
								name		: 'search_id',
								editable	: false,
								width		: 120,
								margin		: '0 0 0 5',
								lookupValue	: [['1','수주번호'],['2','수주상태']],
								value		: '1',
								listeners	: {
									change : function(val){
										console.log(val.value);
										if(val.value == '2'){
											me.down('[name=search_name]').setVisible(false);
											me.down('[name=acpt_stat]').setVisible(true);
										}else if(val.value == '1'){
											me.down('[name=search_name]').setVisible(true);
											me.down('[name=acpt_stat]').setVisible(false);
										}
									}
								}
							},{	name		: 'search_name' ,
								xtype		: 'searchfield' ,
								width		: 215  ,
								margin		: '0 0 0 2',
								clearable	: true,
								readOnly	: false ,
								allowBlank	: true,
								hidden		: false,
								emptyText	: Const.infoNull.queryAll//,
							},{	xtype		: 'lookupfield' ,
								name		: 'acpt_stat',
								width		: 215  ,
								margin		: '0 0 0 2',
								clearable	: true,
								editable	: true,
								lookupValue	: resource.lookup('search_all').concat(resource.lookup('acpt_stat_dvcd')),
								hidden		: true
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('cstm','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								width		: 315,
								pair		: 'cstm_idcd',
								margin		: '0 0 0 0',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
								listeners	: {
									change	: function() {
										var val = this.getValue();
										if(val=='' || val == null){
											me.down('[name=cstm_idcd]').reset();
										}
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('state','진행상태'),
								xtype		: 'lookupfield',
								name		: 'state',
								editable	: true,
								width		: 207,
								lookupValue	: resource.lookup('search_all').concat([['1','납품중'],['2','확정'],['3','중단'],['4','입고완료']])
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox', margin	: '0 40 3 40',
						items : [
							{	fieldLabel	: Language.get('cstm_lott_numb','LOT번호'),
								xtype		: 'textfield',
								name		: 'cstm_lott_numb',
								width		: 342,
								labelWidth	: 123
							},{	fieldLabel	: Language.get('cstm_drtr_name','담당자'),
								xtype		: 'textfield',
								name		: 'cstm_drtr_name',
								width		: 315,
								labelWidth	: 100
							}
						]
					}
				]
			};
		return line;
	}
});