Ext.define('module.custom.iypkg.mtrl.po.purcordr.view.PurcOrdrWorkerLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-worker-lister',
	store		: 'module.custom.iypkg.mtrl.po.purcordr.store.PurcOrdrWorkerLister',
	columnLines	: true ,
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	split		: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ptype  :'cellediting-directinput', clicksToEdit: 1 },{
	        ptype: 'bufferedrenderer',			// 데이터가 많을 경우 처리
	        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
	        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    }],

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-purcordr-worker-search'}];
		me.paging	= me.pagingItem();
		me.columns	= me.columnItem();
		me.callParent();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">전체선택 및 해제</span>'	, handler : me.chkAction	, cls: 'button1-style'	,width:  100} , '-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : true
			}
		;
		return item ;
	},




	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	xtype: 'rownumberer'		, width:35 , hidden : false, align: 'center'
					},{	dataIndex:	'chk'			, text: Language.get('chk'			, '선택'		), width :  35 , align : 'center',xtype:'checkcolumn',/*, filter : 'disabled',*/
						listeners:{
							checkchange:function(element, rowindex, bool, rec) {
								var record = me.store.getAt(rowindex);
								rowIndexNum = rowindex;
								if(bool){
									record.set('offr_qntt',record.get('unoffr'));
									me.cellEditAfter(element, record,rowIndexNum);
								}else{
									record.set('offr_qntt','0');
									me.cellEditAfter(element, record,rowIndexNum);
								}
							}
						}
					},{	dataIndex:	'invc_date'			, width: 100, align : 'center'	, text: Language.get(''		, '수주일자'			), hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'invc_numb'			, width: 90, align : 'center'	, text: Language.get(''		, '수주번호'			), hidden : (_global.hq_id.toUpperCase()=='N1000DAE-A' || _global.hq_id.toUpperCase()=='N1000LIEBE')? true : false,
					},{	dataIndex:	'invc_numb2'		, width: 80, align : 'center'	, text: Language.get(''		, '수주번호'			), hidden:true
					},{	dataIndex:	'fabc_code'			, width: 80, align : 'center'	, text: Language.get( ''	, '원단코드'			), hidden : (_global.hq_id.toUpperCase()=='N1000DAE-A' || _global.hq_id.toUpperCase()=='N1000LIEBE')? true : false,
					},{	dataIndex:	'fabc_name'			, width: 150, align : 'left'	, text: Language.get( ''	, '원단명'				)
					},{	dataIndex:	'ppln_dvcd'			, width:  80, align : 'center'	, text: Language.get( ''	, '골'				), xtype : 'lookupcolumn', lookupValue : resource.lookup('line_dvcd')
					},{	dataIndex:	'item_ttln'			, width:  50, align : 'right'	, text: Language.get( 'item_ttln'	, '장'		), xtype: 'numericcolumn', hidden:(_global.hqof_idcd.toUpperCase() == "N1000IYPKG")
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'item_widh'			, width:  50, align : 'right'	, text: Language.get( 'item_widh'	, '폭'			), xtype: 'numericcolumn', hidden:(_global.hqof_idcd.toUpperCase() == "N1000IYPKG")
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false
						}
					},{	dataIndex:	'item_fxqt'			, width:  60, align : 'right'	, text: Language.get( ''	, '절수'			)
					},{	dataIndex:	'need_qntt'			, width:  70, align : 'right'	, text: Language.get( ''	, '소요량'			), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'unoffr'			, width:  75, align : 'right'	, text: Language.get( ''	, '미발주잔량'		), xtype : 'numericcolumn'
					},{	dataIndex:	'offr_qntt'			, width:  70, align : 'right'	, text: Language.get( ''	, '발주량'			), xtype : 'numericcolumn', summaryType: 'sum'
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[11]);
									}
								}
							}
						}
					},{	dataIndex:	'subt_qntt'			, width:  50, align : 'right'	, text: Language.get( ''	, '감량'			), xtype : 'numericcolumn', summaryType: 'sum'
					, tdCls	: 'editingcolumn',
					editor	: {
						xtype		:'numericfield',
						selectOnFocus: true,
						allowBlank	: false,
						enableKeyEvents : true,
						listeners:{
							keydown : function(self, e) {
								var	grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
									row = store.indexOf(selection)
								;
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									grid.plugins[0].startEdit(row, grid.columns[15]);
								}
							}
						}
					}
					},{	dataIndex:	'fdat_spec'			, width: 160, align : 'left'	, text: Language.get( ''	, '재단규격'			)
					},{	dataIndex:	'prod_code'			, width:  80, align : 'center'	, text: Language.get( ''	, '제품코드'			), hidden : (_global.hq_id.toUpperCase()=='N1000DAE-A' || _global.hq_id.toUpperCase()=='N1000LIEBE')? true : false,
					},{	dataIndex:	'prod_name'			, width: 200, align : 'left'	, text: Language.get( ''	, '품명'				)
					},{	dataIndex:	'mxm2_pric'			, width:  70, align : 'right'	, text: Language.get( ''	, '단가/m2'			), xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								blur:function(){
									var select = this.up('grid').getSelectionModel().getSelection()[0],
									    value  = this.getValue(),
									    pqty_pric = select?value *select.get('mxm2_qntt'):select.get('pqty_pric')
									;
									select.set('pqty_pric',pqty_pric)
								},
								keydown : function(self, e) {
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									var grid = self.up('grid'),
									store = me.getStore(),
									selection = me.getSelectionModel().getSelection()[0],
									row = store.indexOf(selection);
										grid.plugins[0].startEdit(row, grid.columns[16]);
									}
								}
							}
						}
					},{	dataIndex:	'pqty_pric'			, width:  70, align : 'right'	, text: Language.get( ''	, '단가/개'		), xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false
						, tdCls	: 'editingcolumn',
						editor	: {
							xtype		:'numericfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row, grid.columns[20]);
									}
								}
							}
						}
					},{	dataIndex:	'offr_amnt'			, width:  80, align : 'right'	, text: Language.get( ''	, '공급가'			), hidden : false, xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'offr_vatx'			, width:  70, align : 'right'	, text: Language.get( ''	, '부가세'			), hidden : false, xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'ttsm_amnt'			, width: 100, align : 'right'	, text: Language.get( ''	, '합계금액'		), hidden : false, xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
//					},{	dataIndex:	'remk_text'			, width: 100, align : 'left'	, text: Language.get( ''	, '합계금액'		), hidden : true, xtype : 'numericcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'user_memo'			, flex : 1  , minWidth: 120, align : 'left'	, text: Language.get( ''	, '비고'			), tdCls	: 'editingcolumn', hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
						editor	: {
							xtype		:'textfield',
							selectOnFocus: true,
							allowBlank	: false,
							enableKeyEvents : true,
							listeners:{
								keydown : function(self, e) {
									var	grid = self.up('grid'),
										store = me.getStore(),
										selection = me.getSelectionModel().getSelection()[0],
										row = store.indexOf(selection)
									;
									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
										grid.plugins[0].startEdit(row+1, grid.columns[10]);
									}
								}
							}
						}
					},{	dataIndex:	'ppkd_dvcd'			, width:  80, align : 'center'	, text: Language.get( ''	, '지종'			), xtype : 'lookupcolumn', lookupValue : resource.lookup('ppkd_dvcd')
					},{	dataIndex:	'cstm_code'			, width:  80, align : 'center'	, text: Language.get(''		, '수주처코드'		), hidden : _global.hq_id.toUpperCase()=='N1000DAE-A'? true : false,
					},{	dataIndex:	'cstm_name'			, width: 130, align : 'left'	, text: Language.get(''		, '수주처'			)
					},{	dataIndex:	'acpt_qntt'			, width:  60, align : 'right'	, text: Language.get( ''	, '수주량'			), xtype : 'numericcolumn', summaryType: 'sum'
					},{	dataIndex:	'deli_date'			, width: 100, align : 'center'	, text: Language.get( ''	, '납기일자'		)
					}
				]
			}
		;
		return item;
	},


	cellEditAfter  : function (editor, context,rowIndexNum) {
		var	me			= this,
			grid		= this,
			rowIndex,
			qntt	,
			pric	,
			amnt	,
			vatx	,
			ttsm	,
			models
		;
		rowIndex = context.rowIdx!=undefined?context.rowIdx:rowIndexNum;
		models		= grid.getStore().getRange();

		var store = grid.getStore().getAt(rowIndex);
		if(rowIndexNum == undefined){
			if(context.column.dataIndex == "subt_qntt"){
				qntt = (store.get('unoffr') - store.get('subt_qntt'));
				models[rowIndex].set('offr_qntt',qntt);
			}else{
				qntt = store.get('offr_qntt');		//발주량
			}
		}else{
			models[rowIndex].set('subt_qntt',0);
			qntt = store.get('offr_qntt');
		}
		subt		= store.get('subt_qntt');		//감량
		pric		= store.get('pqty_pric');		//개당단가
		amnt		= Math.floor(qntt*pric);								//공급가
		vatx		= Math.floor((qntt*pric)*0.1);							//부가세
		ttsm		= amnt+vatx	;											//합계

		models[rowIndex].set('offr_amnt',amnt);
		models[rowIndex].set('offr_vatx',vatx);
		models[rowIndex].set('ttsm_amnt',ttsm);

	},

	chkAction : function() {
		var	me		= this,
			grid	= me.up('grid'),
			store	= grid.getStore()
		;

		msg = '선택해제 중입니다.';
		var chk = store.find('chk',true);
		var boolean = false;
		if(chk == -1){
			boolean = true;
			msg = '전체선택 중입니다.';
		}
		var mask = new Ext.LoadMask(grid, {msg: msg});
		mask.show();

		var i = 0;
		var count = store.getCount();
		setTimeout(function(){		// each 실행이 너무 빨라서 mask가 발동되지않음.
			store.each(function(record){

				var rowIndexNum = store.indexOf(record);
				record.set('chk',boolean);
				if(boolean){
					record.set('offr_qntt',record.get('unoffr'));
				}else{
					record.set('offr_qntt',0);
				}
				grid.cellEditAfter('', record, rowIndexNum);
				if(i == count-1){
					mask.hide();
				}
				i++;

			})
		}, 100)
		if(count == 0){
			mask.hide();
		}
	},

	listeners: {
		edit : function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		}
	}
});
