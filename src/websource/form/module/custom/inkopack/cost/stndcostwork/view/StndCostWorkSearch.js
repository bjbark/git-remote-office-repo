Ext.define('module.custom.inkopack.cost.stndcostwork.view.StndCostWorkSearch', { extend: 'Axt.form.Search',
	alias: 'widget.module-stndcostwork-search',
	/**
	 * 초기화 메소드
	 */
	initComponent: function(){
		var me = this;
		me.items = me.searchBasic();
		me.callParent();
	},
	searchBasic : function(){
		var me = this,
			line = {
				xtype	: 'fieldset'
				,border	: 0
				,style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' }
				,region	: 'center'
				,width	: '100%'
				,height  : 40
				,margin	: '0 40 0 40'
				,items	: [
					{	xtype	: 'fieldset',
						border	: 3,
						flex	: 1,
						style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
						region	: 'center',
						height	: 34,
						margin	: '3 0 0 0',
						defaults: { xtype: 'fieldset', layout: 'hbox', margin : '3 10  0', padding:'0', border: 0 },
						layout	: 'hbox',
						items	: [
							{	xtype	: 'label',
								text	: 'SEARCH  | ',
								margin	: '7 10 0 0',
								style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
							},{	fieldLabel	: Language.get( 'cost_type_name', '원가타입' ),
								xtype		: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								name		: 'cost_type_name',
								pair		: 'cost_type_bacd',
								allowBlank	: true,
								clearable	: true ,
								width		: 200,
								emptyText	: '조회할 원가타입을 입력하세요',
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-base-popup',
									params	: { prnt_idcd : '6505' , stor_grp : _global.stor_grp, line_stat : '0' },
									result	: function(records, nameField, pairField){
										nameField.setValue(records[0].get('base_name'));
										pairField.setValue(records[0].get('base_code'));
									}
								}
							},{	name		: 'cost_type_bacd', xtype : 'textfield' , hidden : true,
								listeners	: {
									change	: function(field, val) {
										var lister = Ext.ComponentQuery.query('module-stndcostwork-lister')[0];
										if(val){
											lister.select({
												callback:function(records, operation, success) {
													if (success && records.length > 0) {
														lister.getSelectionModel().select(0);
													} else {
													}
												}, scope:me
											}, Ext.merge( me.getValues(), { hqof_idcd : _global.hq_id , stor_grp : _global.stor_grp } ));
										}else{
											lister.getStore().clearData();
											lister.getStore().loadData([], false);
										}
									}
								}
							},{	name	: 'find_nm'     ,
								xtype	: 'searchfield',
								flex	: 4,
								clearable		: true,
								enableKeyEvents : true,
								listeners:{
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == 9) {
											var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
											searchButton.fireEvent('click', searchButton); /* 조회버튼 Click */
										}
									},
								}
							}
						]
					},{	xtype	: 'button'  ,action : Const.SELECT.action, margin : '2 2 0 0',region : 'north' , width   : 40, height 	: 36,
						style	: 'background:url("../../../resource/img/btn_search_icon.png")'
					},{	xtype	: 'fieldset',border	: 0 ,region	: 'north',height  : 34, width	: 2
					}
				]
			}
		;
		return line;
	}
});