Ext.define('module.prod.order.workentry.view.WorkEntryLister1', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister1'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntryLister1',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->', '-' ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, handler: me.insert ,cls: 'button-style',itemId:'insert' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, handler: me.insert ,cls: 'button-style',itemId:'modify' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId:'lister1'} , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler : me.deleteItem ,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 60 , align : 'center' ,hidden : true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번')			, width : 60 , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'자재코드')		, width : 140 , align : 'center'
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, width : 360
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')			, width : 120 , align : 'center',
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'lot번호')		, width : 120, align : 'center',
					},{ dataIndex: 'need_qntt'		, text : Language.get('need_qntt'		,'소요수량')		, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'ivst_qntt'		, text : Language.get('ivst_qntt'		,'투입수량')		, width : 100 , xtype : 'numericcolumn'
					},{ dataIndex: 'item_idcd'		, text : Language.get('item_idcd'		,'품목id')		, width : 100  ,hidden:true
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		var me = this,
			temp = me.up('grid'),
			uptemp = temp.up('[title=생산실적 관리]'),
			table = uptemp.down('[title=생산실적관리]'),
			value = table.getSelectionModel().getSelection()[0],
			own = uptemp.down('[title=자재사용내역]').getStore(),
			param = uptemp.down('[title=자재사용내역]').getSelectionModel().getSelection()[0],
			item_idcd,ivst_qntt,line_seqn,item_name,_set
		;
		if(own.data.items.length>0){
			if(me.iconCls=='icon-insert'){								//버튼 itemID가 무조건 modify로 들어오는 오류가 있어서 변경함
				line_seqn = (own.data.items[own.data.items.length-1].data.line_seqn)+1;
			}else if(me.iconCls=='icon-modify'){
				if(param){
					line_seqn = param.data.line_seqn;
				}else{
					Ext.Msg.alert('알림','자재사용내역을 선택해주세요.')
				}
			}
		}else{
			line_seqn = 0;
		}
		if(me.iconCls=='icon-insert'){
			_set = 'insert';
		}else if(me.iconCls=='icon-modify'){
			if(param){
				_set = 'update';
				item_idcd = param.data.item_idcd;
				ivst_qntt = param.data.ivst_qntt;
				item_name = param.data.item_name;
			}else{
				Ext.Msg.alert("알림","자재사용내역을 선택해주세요.")
				return;
			}
		}
		if(value){
			resource.loadPopup({
				widget : 'module-workentry-popup1',
				params : { stor_id : _global.stor_id, row_sts : '0',invc_numb: value.data.invc_numb,_set:_set,line_seqn:line_seqn ,item_idcd:item_idcd,ivst_qntt:ivst_qntt
					,item_name:item_name},
				values : {
	//				invc_numb     : record.get('inv_no'   ),
	//				payment    : record.get('npay_amt'  ),
	//				npay_amt    : record.get('npay_amt'  ),
	//				crt_ui  : '0000000127' ,
	//				crt_id  : _global.emp_id
				},
				result : function(result) {
					if (result.success) {
	//					record.dirtyValue( 'payment' , record.get('inv_amt') );
	//					record.dirtyValue( 'npay_amt' , 0  );
	//					record.dirtyValue( 'sts_cd'  , '0190' );
	//					record.store.commitChanges();
					}
				}
			})
		}else{
			Ext.Msg.alert("알림","생산실적을 선택하여주세요.");
		}

	},
	deleteItem : function() {
		var	tempa = this.up('grid'),
			store = this.up('grid').getStore(),
			selectItem = tempa.getSelectionModel().selected.items[0].data,
			line_seqn = selectItem.line_seqn,
			invc_numb = selectItem.invc_numb,
			_set = 'delete'
		;
		Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
			if(button=='yes'){
				record = Ext.create( store.model.modelName , {
					invc_numb: invc_numb,
					line_seqn: line_seqn,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						store.reload();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : _set} );
			}
		});
	}
});