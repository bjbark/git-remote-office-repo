Ext.define('module.sale.salework.view.SaleWorkWorkerLister', { extend: 'Axt.grid.Panel',

	alias         : 'widget.module-salework-worker-lister',

	region        : 'center',
	border        : 0,
	columnLines   : true,
	selModel      : {selType:'cellmodel'},
	plugins       : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
	features      : [{ ftype : 'grid-summary' }],
	viewConfig 	: { markDirty: false , loadMask : false , enableTextSelection: true },

	initComponent : function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-salework-worker-search'}];
		me.paging      = me.pagingItem() ;
		me.columns     = me.columnItem();
    	me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},



	pagingItem : function () {
		var  me = this,
			item = {
			    xtype : 'grid-paging',
				items : [
				    { text: '엑셀 붙여넣기', action : 'ExcelPaste'  , iconCls : Const.EXPORT.icon }, '-',
				    { hidden: true, text: '일괄 가격 변경'    , action : 'PriceChange' , iconCls : Const.MODIFY.icon },
	   	 	 		'->', '-',
	   	 	 		{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style'},
	   	 	 		{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style'}, '-'
	   	 	 	], pagingButton : false
			}
		;
		return item ;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults : {   style: 'text-align:center'},
				items    : [
	        	    {   dataIndex : 'seq_dsp',
	        	    	width     :  45 ,
	        	    	text      : Language.get('seq', '항번')
	        	    },
	        		{   dataIndex : 'item_code' ,
	        			width     : 110,
	        			text      : Language.get('itm_code', '품목코드')
	        		},
	        		{   dataIndex : 'item_name' ,
	        			width     : 150,
	        			text      : Language.get('item_name', '품명') ,
	        			tdCls     : 'editingcolumn',
	        			summaryType : 'count',
			 		    editor    : {
					 	    xtype        : 'textfield',
				 			selectOnFocus: true,
				 			allowBlank   : false,
		        			maxLength : 100,
		        			maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.'
				 		}
	        		},
	        		{   dataIndex : 'item_spec' ,
	        			width     : 150,
	        			text      : Language.get('itm_spec', '규격') ,
	        			tdCls     : 'editingcolumn',
			 		    editor    : {
					 	    xtype        : 'textfield',
				 			selectOnFocus: true,
				 			allowBlank   : false,
		        			maxLength : 100,
		        			maxLengthText : '한글 100자 이내로 작성하여 주시기 바랍니다.'
				 		}
	        		},
	        		{   dataIndex : 'unit_name' ,
	        			width     :  50,
	        			text      : Language.get('itm_unit', '단위')

	        		},
        			{   dataIndex : 'piece_qty' ,
        				xtype     : 'numericcolumn',
        				width     : 50,
        				text      : Language.get('piece_qty', '포장량') ,
        				align     : 'right'
        			},
	        		{   dataIndex   : 'qty' ,
	        			xtype       : 'numericcolumn',
	        			width       : 50,
	        			text        : Language.get('quantity', '수량') ,
	        			tdCls       : 'editingcolumn',
	        			summaryType : 'sum',
			 		    editor: {
				 		  xtype        : 'numericfield',
			 			  selectOnFocus: true,
			 			  allowBlank   : false
			 		   }
	        		},
	        		{   dataIndex : 'pri' ,
	        			xtype     : 'numericcolumn',
	        			width     :  60,
	        			text      : Language.get('pri', '단가') ,
	        			tdCls     : 'editingcolumn',
			 		    editor    : {
					 	    xtype        : 'numericfield',
				 			selectOnFocus: true,
				 			allowBlank   : false
				 		}
	        		},
	        		{   dataIndex : 'sply_amt' ,
	        			xtype     : 'numericcolumn',
	        			width     :  70,
	        			font_color : 'red',
	        			text      : Language.get('amount_subtotal','공급가'),
	        			summaryType : 'sum'
	        		},
	        		{   dataIndex   : 'tax_amt'  ,
	        			xtype       : 'numericcolumn',
	        			width       :  70,
	        			font_color  : 'green',
	        			text        : Language.get('tax_amt',  '부가세'),
	        			summaryType : 'sum'
	        		},
	        		{   dataIndex   : 'txfree_amt'  ,
	        			xtype       : 'numericcolumn',
	        			width       :  70,
	        			text        : Language.get('non_tax',  '비과세'),
	        			summaryType : 'sum'
	        		},
	        		{   dataIndex   : 'inv_amt'  ,
	        			xtype       : 'numericcolumn',
	        			width       :  70,
	        			font_color  : 'blue',
	        			text        : Language.get('total_amount',  '합계금액'),
	        			summaryType : 'sum'
				 	}
	        	]
			}
		;
		return item;
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		context.record.recalculation( me.editor.getRecord() );
		editor.grid.view.getSelectionModel().onKeyDown();
	},

	listeners: {

		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'qty' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
		 			fn : function (button) {
		 				if (button==='yes') {
		 					context.record.set(field, context.value);
		 					me.cellEditAfter(editor, context);
		 				}
		 			}
				});
				return false;
			} else if (field === 'pri' && value > 10000000){
				Ext.Msg.show({ title: '단가확인', msg: '단가가 10,000,000원을 넘었습니다. 계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
		 			fn : function (button) {
		 				if (button==='yes') {
		 					context.record.set(field, context.value);
		 					me.cellEditAfter(editor, context);
		 				}
		 			}
				});
				return false;
			}

			return true;
		},

		edit: function(editor, context) {
			var me = this;
			me.cellEditAfter(editor, context);
		},

		render: function(){
			var me = this;
			new Ext.util.KeyMap({
			        target  : me.getEl().dom,
			        binding :
			        [
			     		/* Ctrl + Delete */
			     	    {
			     		    ctrl:true, key: 46,
				     		fn: function(key,e){
				     			var records = me.getSelectionModel().getSelection();
				     	 		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				     	 			fn : function (button) {
				     	 				if (button==='yes') {
				     	 					me.getStore().remove (records);
				     	 				}
				     	 			}
				     			});
			     			}
			     	    }
			     	]
			});
		}
	}
});






