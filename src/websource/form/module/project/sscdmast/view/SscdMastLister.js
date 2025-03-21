Ext.define('module.project.sscdmast.view.SscdMastLister', { extend: 'Axt.grid.Panel',
	required : ['Ext.grid.plugin.CellEditing'],

	alias: 'widget.module-sscdmast-lister',
	store: 'module.project.sscdmast.store.SscdMast',
	columnLines: true ,// 컬럼별 라인 구분
	selModel: {	selType: 'checkboxmodel', mode : 'SINGLE'},//mode : 'SINGLE' MULTI
    //plugins: [{ptype :'cellediting' , clicksToEdit: 1 }],
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					{	xtype		: 'form-panel',
						bodyStyle	: { padding: '4 5 0 0' ,"background-color":"#d8e4f2" },
						border		: 0,
						items:[
							{	xtype			: 'popupfield',
								editable	: true,
								enableKeyEvents : true,
								fieldLabel		: '고객사',
								name			: 'hqof_name',
								pair			: 'hqof_idcd',
								labelAlign		: 'right',
								labelWidth		: 39,
								width			: 180,
								allowBlank		: true,
								popup			: {
									select		: 'SINGLE',
									widget		: 'lookup-bonsa-popup',
									params		: { hq_sts : ['1000' ] , group_yn : '1' , row_sts : 0 }, // stor_id : _global.stor_id,
									result		:  function(records, nameField, pairField ){
										nameField.setValue(records[0].get('hq_nm'));
										pairField.setValue(records[0].get('hq_id'));
									}
								}
							},{	xtype	: 'textfield',
								name	: 'hqof_idcd',
								hidden	: true
							}
						]
					},{	text	: '<span class="write-button">공통코드 배포(관제에서 고객DB로)</span>'	, action : 'code_ini'   , cls: 'button1-style', width:200,
						tooltip	: { text: '관제 시스템에 등록된 회사별 명칭정보를 고객사 DB에 이관한다. <<수정시 마다 작업 필요 함>> ', anchor: 'top'}
					},
					'->', '-' ,
					{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
					{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style' } ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } , '-' ,
					{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this
			,item = {
				defaults: {style: 'text-align:center'},
				items : [
					{ 	dataIndex: 'sscd_code'  , text : Language.get('sscd_code'	,'코드')		, width : 120
					},{	dataIndex: 'lang_dvcd'  , text : Language.get('lang_dvcd'	,'언어')		, width :  50,  xtype : 'lookupcolumn', lookupValue : resource.lookup('lang_dvcd') , align : 'center'
					},{ dataIndex: 'sscd_name'  , text : Language.get('sscd_name'	,'코드명')		, width : 200
					},{	dataIndex: 'lkup_valu'  , text : Language.get('lkup_valu'	,'코드항목')	, flex  :   5,
						renderer : function(value, meta, record, rowIndex, colIndex, store) {
							return value.replace(/["']/g, "");
						}
					},{ dataIndex: 'user_memo'   , text : Language.get('user_memo'	,'메모사항')	, flex  :   5
					},{	dataIndex: 'line_stat'	, text : Language.get('line_stat'	,'숨김')		, width :  50, xtype : 'lookupcolumn', lookupValue : resource.lookup('line_stat') , align : 'center'
					}
				]
			}
		;
		return item;
	}

});

