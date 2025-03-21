Ext.define('module.project.projmenu.view.ProjMenuLister', { extend: 'Ext.tree.Panel',
	alias: 'widget.module-projmenu-lister',
	store: 'module.project.projmenu.store.ProjMenu',
	border : 0  ,
	columnLines: true ,// 컬럼별 라인 구분
	rootVisible: false , // 최상위 node 숨김
	rowLines : true,
	stripeRows : true,
	singleExpand : false,

	viewConfig : {
         plugins : { ptype: 'treeviewdragdrop' }
	},
	/**
	 *
	 */
	initComponent: function () {
		var me = this;
		me.dockedItems = [ me.pagingItem() ];
		me.columns = me.columnItem();
		me.callParent();
	},
	/**
	 *
	 */
	pagingItem : function () {
		var me = this,
			item = {
			xtype	: 'toolbar',
			dock	: 'bottom',
			items	: [
			 	'->', //'-' ,
			 	{text : Const.INSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action, cls: 'button-style' } ,
			 	{text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, action : Const.MODIFY.action, cls: 'button-style'} , '-' ,
   	 		 	{text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button-style' }
		    ]
		};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
		        items		: [
		         	{	text : '메뉴트리'     , dataIndex: 'text'         , width : 250 , xtype: 'treecolumn' ,
		         		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
		         			var expmark = '';
			         		if (!record.data.last_modl_yn) {
				         		 if (record.data.depth === 1) {
				         			expmark = 'ROOT MENU' ;//record.data.site_id ;
				         		 } else {
				         			 expmark = record.data.tree_expn_yn ? '+' : '-' ;
				         		 }
			         		 }
			         		 return record.get('row_sts') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
			        	 }
			        },{	text        : '메뉴구분',
			         	dataIndex   : 'menu_gb'   ,
			         	xtype       : 'lookupcolumn' ,
			         	editable    : false ,
			         	lookupValue : resource.lookup('menu_gb') ,
			         	width       : 70,
			         	align       :'center'
	     		 	},{ text : '모듈이름' , dataIndex: 'modl_id'		, width : 100	, editor: { allowBlank: false}
	     		 	},{ text : '컨트롤명' , dataIndex: 'modl_nm'		, width : 130	, editor: { allowBlank: false}
	     		 	},{ text : '숨김'    , dataIndex: 'row_sts'		, width : 50	, xtype: 'lookupcolumn',lookupValue : resource.lookup('row_sts')
     		 		},{	text : '등록'	, dataIndex: 'inpt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','등록']].concat( resource.lookup('row_using')) , align : 'center'
 		 			},{	text : '수정'	, dataIndex: 'upt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','수정']].concat( resource.lookup('row_using')), align : 'center'
	 				},{	text : '삭제'	, dataIndex: 'del_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','삭제']].concat( resource.lookup('row_using')), align : 'center'
 					},{	text : '출력'	, dataIndex: 'prt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','출력']].concat( resource.lookup('row_using')), align : 'center'
					},{	text : '엑셀'	, dataIndex: 'expt_use_yn'	, width : 50	, xtype: 'lookupcolumn',lookupValue : [['1','엑셀']].concat( resource.lookup('row_using')), align : 'center'
					},{ text : '메모'	, dataIndex: 'usr_memo'    , flex  : 1		, editor: { allowBlank: false}
					}

		     		 	//{  text: '본사', dataIndex: 'hq_use_yn',  width: 35 ,  xtype: 'lookupcolumn',lookupValue : [['1','본사']].concat( resource.lookup('row_using')), align : 'center' }, // xtype: 'checkcolumn', renderer : me.checkboxRenderer, processEvent : me.checkboxProcessEvent},
		     		 	//{  text: '직영', dataIndex: 'dm_use_yn',  width: 35 ,  xtype: 'lookupcolumn',lookupValue : [['1','직영']].concat( resource.lookup('row_using')), align : 'center' }, // xtype: 'checkcolumn', renderer : me.checkboxRenderer, processEvent : me.checkboxProcessEvent},
		     		 	//{  text: '가맹', dataIndex: 'branch_use_yn',  width: 35 ,  xtype: 'lookupcolumn',lookupValue : [['1','가맹']].concat( resource.lookup('row_using')), align : 'center' }, // xtype: 'checkcolumn', renderer : me.checkboxRenderer, processEvent : me.checkboxProcessEvent},
			         	//{  text: '사용권한' , dataIndex: 'auth_gb'    , width : 80  ,  xtype : 'lookupcolumn', lookupValue : resource.getList('auth_gb') , align : 'center' },

	        ]
		};
		return item;
	}
});





