Ext.define('module.sale.sale.saleosttlist.view.SaleOsttListSearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-salelist-search',

	initComponent: function(){
		var me = this;
		me.items =[ me.searchBasic(), me.addonSearch()];
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
							},{	name	: 'find_nm'		,
								xtype		: 'searchfield'	,
								flex		: 4				,
								emptyText	: '',
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
				defaults		: { xtype: 'fieldset', layout: 'vbox', margin : '0 0 0 0', padding: '0', border: 0 , },
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items		: [
					{	xtype : 'fieldset',
						layout: 'hbox',
						items : [
							{	xtype		: 'betweenfield',
								name		: 'fr_dt',
								pair		: 'to_dt',
								fieldLabel	: Language.get('ostt_date','출고일자'),
								labelWidth	: 99,
								width		: 199,
								root		: true,
								value		: Ext.Date.add( new Date(), Ext.Date.MONTH, -1)
							},{	xtype		: 'betweenfield',
								fieldLabel	:'~',
								name		: 'to_dt',
								pair		: 'fr_dt',
								width		: 115,
								labelWidth	: 15
							},{	fieldLabel	: Language.get('cstm', '거래처' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								width		: 310,
								name		: 'cstm_name',
								pair		: 'cstm_idcd',
								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								popup		: {
									widget	: 'lookup-cstm-popup',
									select	: 'SINGLE',
									params	: { stor_id : _global.stor_id , line_stat : '0' },
									result	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if(val == '' || val == null){
											me.down('[name=cstm_idcd]').reset();
										}
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{
								fieldLabel	: Language.get('', '마감'),
								xtype		: 'lookupfield',
								name		: 'line_clos',
								editable	: false,
								width		: 180,
								lookupValue	: resource.lookup('search_all').concat( resource.lookup('line_clos' )),
								value		: ''
							}
						]

					},{	xtype : 'fieldset',
						layout: 'hbox',
						margin: '5 0 5 5',
						items : [
							{	fieldLabel	: Language.get('','품목코드'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								hidden		: _global.hq_id !='N1000nbolt',
								name		: 'item_code',
								pair		: 'item_idcd',
								width		: 309,
								labelWidth	: 94,
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-item-popup-v4',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'제품' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_code'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
							},{	name : 'item_idcd', xtype : 'textfield' , hidden : true
							},{	xtype		: 'lookupfield',
								name		: 'search_id',
								editable	: false,
								width		: 75,
								hidden		: _global.hq_id =='N1000nbolt',
								margin		: '0 0 0 50',
								value		: '5',
								lookupValue	: resource.lookup('pointreport.query_word' ).concat( [['5','수주번호'],['7','출고번호']] ),
							},{	name		: 'find_name' ,
								xtype		: 'searchfield' ,
								width		: 182 ,
								hidden		: _global.hq_id =='N1000nbolt',
								margin		: '0 0 0 2',
								clearable	: true,
								emptyText	: Const.infoNull.queryAll
							},{	fieldLabel	: Language.get('','품목군'),
								labelWidth	: 100,
								width		: 310,
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								hidden		: _global.hq_id !='N1000nbolt',
								name		: 'item_clss_bacd_name',
								pair		: 'item_clss_bacd',
								clearable	: true ,
								popup		: {
									select  : 'SINGLE',
									widget  : 'lookup-base-popup',
									params  : { stor_id : _global.stor_id , line_stat : '0' , prnt_idcd : '8001'},
									result  : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name	: 'item_clss_bacd'		, xtype : 'textfield', hidden : true
							},{	xtype		: 'textfield',
								name		: 'cust_idcd',
								hidden		: true
							},{	fieldLabel	: Language.get('man_job', '영업담당' ),
								name		: 'inv_user_nm',
								pair		: 'drtr_idcd',
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								emptyText	: Const.infoNull.queryAll,
								clearable	: true,
								width		: 310,
								popup		: {
									widget 	: 'lookup-user-popup',
									select 	: 'SINGLE',
									params 	: { stor_grp : _global.stor_grp },
									result 	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('user_name'));
										pairField.setValue(records[0].get('user_idcd'));
									}
								},
								listeners	: {
									change	: function(){
										var val = this.getValue();
										if(val == '' || val == null){
											me.down('[name=drtr_idcd]').reset();
										}
									}
								}
							},{	xtype		: 'textfield', name		: 'drtr_idcd', hidden		: true
							}
						]
					}
				]
			};
		return line;
	}

});