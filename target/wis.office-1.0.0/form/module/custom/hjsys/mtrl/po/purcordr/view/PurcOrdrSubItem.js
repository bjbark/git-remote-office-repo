Ext.define('module.custom.hjsys.mtrl.po.purcordr.view.PurcOrdrSubItem', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-purcordr-lister-subItem',
	store		: 'module.custom.hjsys.mtrl.po.purcordr.store.PurcOrdrSubItem',

	split		: true,
	columnLines	: true,
	selModel	: { selType: 'cellmodel'},
	features	: [{ ftype : 'grid-summary' , remote : false }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent : function () {
		var me = this
			me.paging		= me.pagingItem();
			me.columns		= me.columnItem();
			me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},
	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			acct_bacd = '부자재',
			item = {
				defaults	: {   style: 'text-align:center'},
				items		: [
					{	dataIndex : 'item_idcd'			, text : Language.get('wkfw_idcd'		,'ID'			) , width :  50 , align :'center', hidden : true,
					},{ dataIndex : 'invc_numb'			, text : Language.get('invc_numb'		,'수주번호'		) , width : 130 , align :'left',
					},{ dataIndex : 'acpt_seqn'			, text : Language.get('acpt_seqn'		,'수주순번'		) , width :  60 , align :'center',
					},{ dataIndex : 'acct_bacd'			, text : Language.get('acct_bacd'		,'계정구분'		) , width :  60 , align :'center', hidden : true
						, xtype : 'lookupcolumn'
						, lookupValue : [["1002", "부자재"],["1003", "소모품"]],
						tdCls : 'editingcolumn',
					},{ dataIndex : 'drwg_numb'			, text : Language.get('drwg_numb'		,'도번'			) , width : 120 , align : 'left'
					},{ dataIndex : 'revs_numb'			, text : Language.get('revs_numb'		,'Rev'			) , width :  50 , align : 'left'
					},{ dataIndex : 'item_name'			, text : Language.get('item_name'		,'품명'			) , width : 200 , align : 'left'
					},{ dataIndex : 'item_leng'			, text : Language.get('item_leng2'		,'제품길이'		) , width :  70 , align : 'right', xtype: 'numericcolumn'
					},{ dataIndex : 'item_widh'			, text : Language.get('item_widh2'		,'제품넓이'		) , width :  70 , align : 'right', xtype: 'numericcolumn'
//					},{ dataIndex : 'pqty_ndqt'			, text : Language.get('pqty_ndqt'		,'품목소요량'		) , width :  85 , align : 'right', xtype: 'numericcolumn' , summaryType: 'sum',
					},{ dataIndex : 'need_qntt'			, text : Language.get('need_qntt'		,'소요량'		) , width :  80 , align : 'right', xtype: 'numericcolumn' , summaryType: 'sum',
					},{ dataIndex: 'offr_yorn'			, text : Language.get('offr_yorn'		,'발주여부'		) , width : 90, xtype:'numericcolumn', hidden : true,
					},{ dataIndex: 'ostt_yorn'			, text : Language.get('ostt_yorn'		,'출고여부'		) , width : 90, xtype:'numericcolumn', hidden : true,
					}
				]
			}
		;
		return item;
	},

	rowInsert: function(){
		var me			= this,
			grid		= me.up('grid'),
			editor		= Ext.ComponentQuery.query('module-purcordr-worker-editor')[0],
			store		= grid.getStore(),
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			max_seq		= 0,
			lastidx		= store.count()
		;
		max_seq = 0;
		var invc_numb = editor.down('[name=invc_numb]').getValue();
		store.each(function(findrecord) {
			if (findrecord.get('line_seqn') > max_seq) {
				max_seq		= findrecord.get('line_seqn');   // 최종으로 사용한 항번을 찾는다....
			}
		});
		max_seq = max_seq + 1;

		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: max_seq,			//순번
			acct_bacd	: '1002',
			modify		: 'Y',				//수정유무
		});

		// ROW 추가
		store.add(record);
		grid.plugins[0].startEdit(lastidx , 0);  // 위에서 Row를 최종 Row를 추가하고, 추가한 Row로 Focus를 이동한다. 단 반드시 Editing 필드이어야 한다....

	},
	/******************************************************************
	 * 선택한 자료를 삭제처리한다.(Ctrl+ Delete or 행삭제 버튼)
	 ******************************************************************/
	rowDelete: function(){
		var	me		= this,
			myform	= me.up('grid'),
			records	= myform.getSelectionModel().getSelection();
		if(records.length == 0){
			Ext.Msg.alert("알림","삭제 할 데이터를 선택해주십시오.");
		}else{
			Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: myform,
				fn : function (button) {
					if (button==='yes') {
						myform.getStore().remove (records);
					}
				}
			});
		}
	},

	cellEditAfter  : function (lister2, context) {
		var me = this;
		var grid = this;
		var models = grid.getStore().getRange();
		var pos = this.view.getSelectionModel().getCurrentPosition().row;
		var need_qntt = this.getSelectionModel().getSelection()[0].data.need_qntt;
		var editor = Ext.ComponentQuery.query('module-purcordr-worker-editor3')[0];
		var values = editor.getForm().getValues();
		var invc_qntt = values.invc_qntt, acpt_qntt = values.acpt_qntt;
		if(need_qntt < 0){
			models[pos].set('need_qntt',0);
			grid.plugins[0].startEdit(pos, 7)
			return;
		}else{
			models[pos].set('need_qntt',invc_qntt*acpt_qntt*need_qntt);
		}
	},

	listeners: {
		validateedit : function (lister2, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			return true;
		},
		edit : function(lister2, context) {
			var me = this;
			me.cellEditAfter(lister2, context);
		}
	},
});
