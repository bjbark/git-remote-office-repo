Ext.define('module.custom.sjflv.sale.sale.noteiomy.view.NoteIomySearch', { extend: 'Axt.form.Search',

	alias: 'widget.module-noteiomy-search',
	initComponent: function(){
		var me = this;
		me.items = [ me.searchBasic(),me.addonSearch() ];
		me.callParent();
	},


	searchBasic : function(){
		var me = this,
			line = {
				 xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor : '#8C8C8C', borderStyle : 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height : 40
				,margin	: '0 40 0 40'
				,items	:[
						{	xtype		: 'fieldset'
							,border		: 3
							,flex		: 1
							,style		: { borderColor	: '#000081', borderStyle	: 'solid' }
							,region		: 'center'
							,height		: 34
							,margin 	: '3 0 0 0'
							,defaults	: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 }
							,layout		: 'hbox'
							,items		:[
								{	xtype	: 'label',
									fieldCls: 'requiredindex',
									text	: 'SEARCH  | ',
									margin	: '5 10 0 0',
									style	: 'text-align:center;color: #0000B7;font-size: 13px !important;font-weight:bold;',
								},{	name	: 'find_name',
									xtype		: 'searchfield',
									flex		: 4,
									emptyText	: '조회할 코드 또는 코드명을 입력하세요...',
									enableKeyEvents : true,
									listeners:{
										keydown : function(self, e) {
											if (e.keyCode == e.ENTER || e.keyCode == 9) {
												var searchButton = self.up('form').down('[action=selectAction]');
												searchButton.fireEvent('click', searchButton); //조회버튼클릭
											}
										},
									}
								}
							]
						},{	xtype	: 'button'  ,
								action : Const.SELECT.action,
								margin : '2 2 0 0',
								region : 'north' ,
								width : 40,
								height : 36,
								style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						},{	xtype	: 'fieldset',
							border	: 0 ,
							region	: 'north',
							height  : 34,
							width	: 2
						},
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
				fieldDefaults	: { width : 341, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('invc_date','조회기간'),
								xtype		: 'betweenfield',
								name		: 'invc_date1',
								pair		: 'invc_date2',
								labelWidth	: 99,
								width		: 198,
								margin		: '0 0 0 0',
								root		: true,
								value		: Ext.Date.getFirstDateOfMonth(new Date()),
								listeners	: {
									change : function(value){
										var val  = value.getValue()
											date = Ext.Date.getFirstDateOfMonth(new Date())
										;
										if(val == '' || val == null){
											value.setValue(date);
										}
									}
								}
							},{	fieldLabel	: Language.get('','~'),
								xtype		: 'betweenfield',
								name		: 'invc_date2',
								pair		: 'invc_date1',
								labelWidth	: 15,
								width		: 115,
								value		: Ext.Date.getLastDateOfMonth(new Date()),
								listeners	: {
									change : function(value){
										var val  = value.getValue()
											date =  Ext.Date.getLastDateOfMonth(new Date())
										;
										if(val == '' || val == null){
											value.setValue(date);
										}
									}
								}
							}
						]
					},{	xtype : 'fieldset', layout: 'hbox',
						items : [
							{	fieldLabel	: Language.get('','거래처'),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cstm_name',
								labelWidth	: 99,
								width		: 313,
								pair		: 'cstm_idcd',
								clearable	: true,
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cstm-popup',
									params : { stor_grp : _global.stor_grp , line_stat : '0', acct_bacd:'삼정(제품)' },
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cstm_name'));
										pairField.setValue(records[0].get('cstm_idcd'));
									}
								}
							},{	name : 'cstm_idcd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('','어음번호'),
								xtype		: 'textfield',
								name		: 'stot_bass',
								width		: 280,
							},{	fieldLabel	: Language.get('','합계구분'),
								xtype		: 'lookupfield',
								name		: 'row_type',
								lookupValue	: [['1','일계'],['2','월계'],['3','합계']],
								multiSelect	: true ,
								editable	: false,
								labelWidth	: 99,
								width		: 200,
								value		: ["3"]
							}
						]
					}
				]
			};
		return line;
	}
});