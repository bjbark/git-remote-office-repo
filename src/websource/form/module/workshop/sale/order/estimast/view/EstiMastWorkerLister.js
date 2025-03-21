Ext.define('module.workshop.sale.order.estimast.view.EstiMastWorkerLister', { extend: 'Axt.grid.Panel',
	alias: 'widget.module-estimast-worker-lister',
	store: 'module.workshop.sale.order.estimast.store.EstiMastInvoice',

	region : 'center',
	border : 0,
	columnLines: true,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	features	: [{ ftype : 'grid-summary' }],
	plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },

	initComponent: function () {
		var me = this;
		me.dockedItems = [{xtype: 'module-estimast-worker-search'}];
		me.paging  = me.pagingItem() ;
		me.columns = me.columnItem();
		me.callParent();
	},
	getDspNo : function() {
	},
	getSeqNo : function() {

	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->','->','->', '-',
					{	text : '<span class="write-button">작업지시서</span>', action : 'printAction'			, cls: 'button1-style'	} , '-',
					{text : Const.ROWINSERT.text, iconCls: Const.INSERT.icon, action : Const.INSERT.action , cls: 'button-style',
						handler: me.rowInsert
					},
					{text : Const.ROWDELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action , cls: 'button-style',
						handler: me.rowDelete
					},
					'->','-',
					{	text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action ,cls: 'button-style' },
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' }, '-'
				], pagingButton : false
			}
		;
		return item ;
	},

	viewConfig: {
		listeners: {
			refresh: function(view) {
				var nodes = view.getNodes();
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					var record = view.getRecord(node);
					var cells = Ext.get(node).query('td');
					var tr = Ext.get(node).query('tr');

//					for(var j = 0; j < cells.length; j++) {
//						if(record.data.drwg_chk == 'NEW'|| record.data.drwg_chk == 'Y') {
//							Ext.fly(cells[3]).setStyle('background', '#419641');
//						}
//						if(record.data.pdsd_yorn == '1'|| record.data.check == 'Y') {
//							Ext.fly(cells[2]).setStyle('background', '#419641');
//						}
//					}
				}
			}
		}
	},
	/**
	 *
	 */
//	columnItem : function () {
//		var me = this,
//			item = {
//				defaults: {style: 'text-align:center'},
//				items : [
//					{	dataIndex:	'line_seqn'		, text: Language.get('line_seqn'		, '순번'		), width: 35 , align : 'center',
//					},{ header: '생산계획',
//						sortable: false,
//						width:70,
//						align : 'center',
//						renderer: function(val,meta,rec) {
//							meta.style = 'width : 70; align : center;';
//							var id = Ext.id();
//							if(rec.data.pdsd_yorn == '1' || rec.data.check == 'Y'){
//								Ext.defer(function() {
//									Ext.widget('button', {
//										renderTo: Ext.query("#"+id)[0],
//										text: '<span style="color : white !important;">계획등록</span>',
//										width: 60,
//										height: 19,
//										cls: 'button-style',
//										style: 'background : #419641',
//										handler: function(b){me.plan(rec)}
//									});
//								}, 50);
//							}else{
//								Ext.defer(function() {
//									Ext.widget('button', {
//										renderTo: Ext.query("#"+id)[0],
//										text: '<span style="color : white !important;">계획등록</span>',
//										width: 60,
//										height: 19,
//										cls: 'button-style',
//										handler: function(b){me.plan(rec)}
//									});
//								}, 50);
//							}
//							return Ext.String.format('<div id="{0}"></div>', id);
//						},
//						dataIndex: 'somefieldofyourstore'
//					},{header: '도면등록',
//						sortable: false,
//						width:70,
//						itemId : 'drwBtn',
//						name:'drwBtn',
//						align : 'center',
//						renderer: function(val,meta,rec) {
//							meta.style = 'width : 70; align : center;';
//							var id = Ext.id();
//							if(rec.data.drwg_chk == 'NEW' || rec.data.drwg_chk == 'Y'){
//								Ext.defer(function() {
//									Ext.widget('button', {
//											renderTo: Ext.query("#"+id)[0],
//											text: '<span style="color : white !important">도면등록</span>',
//											width: 60,
//											height: 19,
//											cls: 'button-style',
//											style: 'background : #419641',
//											handler: function(){me.draw(rec)
//										}
//									});
//								}, 50);
//							}else{
//								Ext.defer(function() {
//									Ext.widget('button', {
//											renderTo: Ext.query("#"+id)[0],
//											text: '<span style="color : white !important">도면등록</span>',
//											width: 60,
//											height: 19,
//											cls: 'button-style',
//											handler: function(){me.draw(rec)
//										}
//									});
//								}, 50);
//							}
//							return Ext.String.format('<div id="{0}"></div>', id);
//						},
//						dataIndex: 'somefieldofyourstore'
//					},{header: '부자재',
//						sortable: false,
//						width:80,
//						itemId : 'subItBtn',
//						name:'subItBtn',
//						align : 'center',
//						renderer: function(val,meta,rec) {
//							meta.style = 'width : 75; align : center;';
//							var id = Ext.id();
//							if(rec.data.suit_chk == 'NEW' || rec.data.suit_chk == 'Y'){
//								Ext.defer(function() {
//									Ext.widget('button', {
//											renderTo: Ext.query("#"+id)[0],
//											text: '<span style="color : white !important">부자재등록</span>',
//											width: 65,
//											height: 19,
//											cls: 'button-style',
//											style: 'background : #419641',
//											handler: function(){me.suIt(rec)
//										}
//									});
//								}, 50);
//							}else{
//								Ext.defer(function() {
//									Ext.widget('button', {
//											renderTo: Ext.query("#"+id)[0],
//											text: '<span style="color : white !important">부자재등록</span>',
//											width: 65,
//											height: 19,
//											cls: 'button-style',
//											handler: function(){me.suIt(rec)
//										}
//									});
//								}, 50);
//							}
//							return Ext.String.format('<div id="{0}"></div>', id);
//						},
//						dataIndex: 'somefieldofyourstore'
//					},{	dataIndex:	'drwg_numb'		, text: Language.get('drwg_numb'		, '도번'		), width: 120 , align : 'left',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[5]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'revs_numb'		, text: Language.get('revs_numb'		, 'Rev'			), width:  50 , align : 'left',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
////								blur	: function(field){
////									var lister = Ext.ComponentQuery.query('module-estimast-worker-lister')[0],
////										store  = lister.getStore(),
////										value  = field.lastValue,
////										revs_numb,drwg_numb, check = '1'
////									;
////
////									console.log(value);
////									drwg_numb = me.view.getSelectionModel().selected.items[0].get('drwg_numb');
////									console.log(revs_numb);
////									if(drwg_numb == '' || drwg_numb == null){
////										Ext.Msg.alert("알림","도번을 입력해 주세요.");
////										check  = '0';
////										return;
////									}
////									if(value == '' || value == null){
////										Ext.Msg.alert("알림","revision 번호를 입력해 주세요.");
////										check  = '0';
////										return;
////									}
////									if(check == '1'){
////										store.each(function(record){
////											if(record.get('drwg_numb') == drwg_numb  && record.get('revs_numb') == value ){
////												Ext.Msg.alert("알림","도번이 중복됩니다.");
////											}
////										});
////									}
////								},
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[6]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'			), width: 200 , align : 'left',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[7]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '품목수주량'			), width: 80  , xtype: 'numericcolumn', summaryType: 'sum',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'numericfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[8]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'item_leng'		, text: Language.get('item_leng'		, '제품길이'		), width: 70 , xtype: 'numericcolumn',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'numericfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								blur : function(){
//									me.calculate();
//								},
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[9]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'item_widh'		, text: Language.get('item_widh'		, '제품넓이'		), width: 70 , xtype: 'numericcolumn',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'numericfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								blur : function(){
//									me.calculate();
//								},
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row, grid.columns[10]);
//									}
//								},
//							}
//						},
//					},{	dataIndex:	'mtrl_name'		, text: Language.get('mtrl_name'		, '적용 원자재'	), width: 200,
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'textfield',
//							selectOnFocus: true,
//							allowBlank	: false,
//							enableKeyEvents : true,
//							listeners	: {
//								keydown : function(self, e) {
//									if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
//										var grid = self.up('grid'),
//											store = me.getStore(),
//											selection = me.getSelectionModel().getSelection()[0],
//											row = store.indexOf(selection);
//										grid.plugins[0].startEdit(row+1, grid.columns[4]);
//									}
//								},
//							}
//						},
//					},{	xtype	: 'actioncolumn',
//						header	: '',
//						width	: 20,
//						align	: 'center',
//						items	: [
//							{	iconCls	: Const.SELECT.icon,
//								tooltip	: '원자재 찾기',
//								handler	: function (grid, rowIndex, colIndex, item, e, record) {
//									if(record.data.item_leng == '' || record.data.item_leng == null){
//										Ext.Msg.alert("알림","제품길이를 확인하여 주십시오.");
//										lister.plugins[0].startEdit(index , grid.columns[8]);
//										return;
//									}
//									if(record.data.item_widh == '' || record.data.item_widh == null){
//										Ext.Msg.alert("알림","제품넓이를 확인하여 주십시오.");
//										lister.plugins[0].startEdit(index , grid.columns[9]);
//										return;
//									}
//
//									resource.loadPopup({
//									select	: 'SINGLE',
//									widget	: 'lookup-item-popup',
//									params	: { stor_grp : _global.stor_grp, line_stat : '0', acct_bacd : '원재료', add : '1', find : record.data.mtrl_name},
//									result	: function(records) {
//										var	parent = records[0];
//										var chk=0;
////										if(parent.data.item_idcd != ''){
////											Ext.Ajax.request({
////												url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/get/chkOrdr.do',
////												method		: "POST",
////												params		: {
////													token	: _global.token_id,
////													param	: Ext.encode({
////														item_idcd		: parent.data.item_idcd,
////														stor_id			: _global.stor_id,
////														hqof_idcd		: _global.hqof_idcd
////													})
////												},
////												success : function(response, request) {
////													var result = Ext.decode(response.responseText);
////													if	(!result.success ){
////														Ext.Msg.error(result.message );
////														return;
////													} else{
////														console.log(result,'result');
////														if(result.records[0].maxsize == 1){
////															Ext.Msg.alert("알림","");
////														}
////
////		//												if(result.records.length >0){
////		//													lister.getSelectionModel().selected.items[0].set('mtrl_ndqt',total);
////		//												}
////													}
////												},
////												failure : function(response, request) {
////													resource.httpError(response);
////												},
////												callback : function() {
////												}
////											});
////										}
//
//										record.set('mtrl_name',parent.data.item_name);
//										record.set('mtrl_idcd',parent.data.item_idcd);
//										record.set('mtrl_spec',parent.data.item_spec);
//										record.set('unit_wigt',parent.data.unit_wigt);
//
//										me.calculate();
//									},
//								})
//							},
//							scope : me
//							}
//						]
//					},{ dataIndex : 'mtrl_idcd'		, text: Language.get('mtrl_idcd'		, '원자재ID'), hidden : true
//					},{	dataIndex:	'mtrl_spec'		, text: Language.get('mtrl_spec'		, '원자재규격'		), width: 150
//					},{	dataIndex:	'mprq_qntt'		, text: Language.get('mprq_qntt'		, '제품수량/장당'		), width:  90 , xtype: 'numericcolumn' , summaryType: 'sum',
//					},{	dataIndex:	'mtrl_ndqt'		, text: Language.get('mtrl_ndqt'		, '원자재 소요량'		), width:  90 , xtype: 'numericcolumn' , summaryType: 'sum',
//					},{	dataIndex:	'bcod_numb'		, text: Language.get('bcod_numb'		, '바코드 번호'		), width: 200 , align: 'center',
//						tdCls	: 'editingcolumn',
//						editor		: {
//							xtype		:'textfield',
//							readOnly	: true,
//							margin		: '0 0 0 0',
//						},
//					},{	dataIndex:	'item_idcd'		, text: Language.get('item_idcd'		, '품목ID'			), hidden : true
//					},{	dataIndex:	'amnd_degr'		, text: Language.get('amnd_degr'		, '차수'				), hidden : true
//					},{	dataIndex:	'pdsd_yorn'		, text: Language.get('pdsd_yorn'		, '생산계획여부'		), hidden : true
//					},{	dataIndex:	'check'			, text: Language.get('check'			, '생산계획등록여부'	), hidden : true
//					},{	dataIndex:	'invc_numb'		, text: Language.get('invc_numb'		, '수주번호'			), hidden : true
//					},{	dataIndex:	'drwg_chk'		, text: Language.get('drwg_chk'			, '도면등록여부'		), hidden : true
//					},{	dataIndex:	'chk'			, text: Language.get('chk'				, 'chk'				), hidden : true
//					},{	dataIndex:	'drChk'			, text: Language.get('drChk'			, '도면등록여부체크'	), hidden : true
//					},{	dataIndex:	'add'			, text: Language.get('add'				, '도번중복여부체크'	), hidden : true
//					},{	dataIndex:	'suit_chk'		, text: Language.get('suit_chk'			, '부자재등록체크'		), hidden : true
//					},{	dataIndex:	'unit_wigt'		, text: Language.get('unit_wigt'		, '단위중량'			), hidden : true
//					},{	dataIndex:	'spgr_valu'		, text: Language.get('spgr_valu'		, '비중'				), hidden : true
//					}
//				]
//			}
//		;
//		return item;
//	},


	calculate : function(){
		var lister    = Ext.ComponentQuery.query('module-estimast-worker-lister')[0]
			store     = lister.getStore(),
			selection = lister.getSelectionModel().getSelection()[0],
			index     = store.indexOf(selection),
			item_leng = selection.data.item_leng,
			item_widh = selection.data.item_widh,
			mtrl_spec = selection.data.mtrl_spec,
			check=0
		;

		if(check==0){
			param = JSON.stringify({
				item_leng	: item_leng,
				item_widh	: item_widh,
				mtrl_spec	: mtrl_spec
			});

			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/get/cal.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						param			: param,
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd
					})
				},
				success : function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else{
						if(result.records.length >0){
							var item_qntt = result.records[0].mprq_qntt;

							lister.getSelectionModel().selected.items[0].set('mprq_qntt',item_qntt);
							var unit_wigt = lister.getSelectionModel().selected.items[0].get('unit_wigt');

							var acpt_qntt = Ext.ComponentQuery.query('module-estimast-worker-editor')[0].down('[name=acpt_qntt]').getValue();
							var cal       = unit_wigt /item_qntt // 원자재 소요량 계산
								total = 0;
							;
							if(!isNaN(cal)){
								total = String(cal).substring(0,String(cal).indexOf('.')+4);
							}
							lister.getSelectionModel().selected.items[0].set('mtrl_ndqt',total);
						}
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		}
	},

	cellEditAfter : function (editor, context) {
		var me = this;
		var lister = Ext.ComponentQuery.query('module-estimast-worker-lister')[0]
		var store = lister.getStore()
//			param	=''
//		;
//		if(item_leng != '' && item_widh != '' && mtrl_spec != ''){
//			param = JSON.stringify({
//				cstm_idcd	: select.data.cstm_idcd,
//				ostt_date	: values.ostt_date,
//				records		: a
//			});
//			Ext.Ajax.request({
//				url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/get/cal.do',
//				method		: "POST",
//				params		: {
//					token	: _global.token_id,
//					param	: Ext.encode({
//						param			: param,
//						stor_id			: _global.stor_id,
//						hqof_idcd		: _global.hqof_idcd
//					})
//				},
//				success : function(response, request) {
//					console.log(response,'response');
//				},
//				failure : function(response, request) {
//					resource.httpError(response);
//				},
//				callback : function() {
//				}
//			});
//		}

//		revs_numb = lister.view.getSelectionModel().selected.items[0].get('revs_numb'); // err
//		drwg_numb = lister.view.getSelectionModel().selected.items[0].get('drwg_numb');
//		if(context.field == 'revs_numb' || context.field == 'drwg_numb' ){
//			if(drwg_numb == '' || drwg_numb == null){
//				Ext.Msg.alert("알림","도번을 입력해 주세요.");
//				check  = '0';
//				return;
//			}
////			if(check == '1'){
////				store.each(function(record){
////						if(record.get('revs_numb') == revs_numb  && record.get('drwg_numb') == drwg_numb ){
////							count += 1;
////						}
////				});
////			}
////			if(count > 1){
////				Ext.Msg.alert("알림","도번이 중복됩니다.");
////			}
//		}
	},

	listeners: {
		validateedit : function (editor, context, eOpts ) {
			var me = this;
			var field = context.field;
			var value = context.value;
			//
			if(field === 'invc_qntt' && value > 999999){
				Ext.Msg.show({ title: '수량 확인 요청', msg: '입력한 수량을 점검해 보시기 바랍니다.  계속 진행하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no',
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

		keypress: {
			element: 'el',
			fn: function(e, iElement ) {
				key = e.getKey();
				if (key != undefined && key != e.LEFT && key != e.RIGHT && key != e.UP && key != e.DOWN && key != e.ENTER && key != e.ESC) {
					var grid = Ext.getCmp(this.id),
						pos  = grid.getView().selModel.getCurrentPosition()
					;
				}
			}
		},
		render: function(){
			var me = this;
			var editor = Ext.ComponentQuery.query('module-estimast-worker-editor')[0];
			new Ext.util.KeyMap({
				target: me.getEl().dom,
				binding: [
					/* Ctrl + Delete */
					{	ctrl:true, key: 46,
						fn: function(key,e){
							var records = me.getSelectionModel().getSelection();
							Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
								fn : function (button) {
									if (button==='yes') {
										editor.down('[name=chk]').setValue('Y');
										me.getStore().remove (records);
									}
								}
							});
						}
					}
				]
			});
		}
	},
	rowInsert: function(){
		var me			= this,
			grid		= me.up('grid'),
			editor		= Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
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

//		도면등록 체크


		record = Ext.create( store.model.modelName , {
			invc_numb	: invc_numb,
			line_seqn	: max_seq,			//순번
			modify		: 'Y',				//수정유무
			check		: 'N',				//계획유무
			chk			: 'Y',				//품목체크
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
						if(records[0].data.pdsd_yorn == '1'){
							Ext.Msg.alert("알림","이미 지시가 내려간 품목은 삭제할 수 없습니다.");
						}else{
							myform.getStore().remove (records);

							if(records[0].data.drwg_chk == 'Y' || records[0].data.check == 'Y'){
								Ext.Ajax.request({
									url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/set/delete.do',
									method		: "POST",
									params		: {
									 	token	: _global.token_id,
										param	: Ext.encode({
											invc_numb	: records[0].get('invc_numb'),
											line_seqn	: records[0].get('line_seqn'),
											amnd_degr	: records[0].get('amnd_degr'),
											check		: 'drwgPror',
										})
									},
									success : function(response, request) {
										var object = response,
											result = Ext.decode(object.responseText)
										;
										if (result.success) {
										} else {
											Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
										}
									},
									failure : function(response, request) {
										resource.httpError(response);
									},
									callback : function() {
									}
								});
							}
						}
					}
				}
			});
		}
	},

	draw : function(rec){
		//TODO 이미지저장
	var	me = this
	;

	resource.loadPopup({
		widget  : 'module-estimast-popup',
		params  : {
			orgn_dvcd : 'acpt_item',
			invc_numb : rec.get('invc_numb'),
			line_seqn : rec.get('line_seqn'),
			amnd_degr : rec.get('amnd_degr'),
			chk       : rec.get('chk'),
			drChk     : rec.get('drChk'),
			drwg_chk  : rec.get('drwg_chk'),
		},
		listeners: {
			close:function(){
			}
		}
	});
	},

	plan : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0],
			editor1 = Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
			lister = Ext.ComponentQuery.query('module-estimast-worker-lister')[0],
			item1  = Ext.ComponentQuery.query('module-estimast-lister-item1')[0]
			item2  = Ext.ComponentQuery.query('module-estimast-lister-item2')[0]
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			check = 1, chk = 0
		;
		item1.getStore().loadData([],true);
		if(editor1.down('[name=acpt_stat_dvcd]').getValue()!='0011'){
			Ext.Msg.alert("알림","승인된 수주건에만 계획을 등록할 수 있습니다.");
			check = 0;
		}
//		if(editor1.down('[name=acpt_stat_dvcd]').getValue()!='0011'){
//			Ext.Msg.alert("알림","승인 수주건에만 계획을 등록할 수 있습니다.");
//			check = 0;
//		}
		if(rec.get('drwg_numb') == null || rec.get('drwg_numb') == ''){
			Ext.Msg.alert("알림","도번을 입력하여 주십시오.");
			check = 0;
		}
		if(rec.get('item_name') == null || rec.get('item_name') == ''){
			Ext.Msg.alert("알림","품명을 입력하여 주십시오.");
			check = 0;
		}
		if(rec.get('invc_qntt') < 0 || rec.get('invc_qntt') == ''){
			Ext.Msg.alert("알림","품목수주량을 확인하여 주십시오.");
			check = 0;
		}
		if(check == 1){
			var acpt_qntt;
			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : rec ,
				callback: function( results ) {
					if (results.success){
						editor.down('[name=cstm_name]').setValue(editor1.down('[name=cstm_name]').getValue());
						editor.down('[name=cstm_idcd]').setValue(editor1.down('[name=cstm_idcd]').getValue());
						editor.down('[name=modl_name]').setValue(editor1.down('[name=modl_name]').getValue());
						editor.down('[name=dlvy_cstm_name]').setValue(editor1.down('[name=dlvy_cstm_name]').getValue());
						editor.down('[name=invc_date]').setValue(editor1.down('[name=invc_date]').getValue());
						editor.down('[name=deli_date]').setValue(editor1.down('[name=deli_date]').getValue());
						editor.down('[name=unit_name]').setValue(editor1.down('[name=unit_name]').getValue());
						editor.down('[name=unit_idcd]').setValue(editor1.down('[name=unit_idcd]').getValue());
						editor.down('[name=user_memo]').setValue(editor1.down('[name=user_memo]').getValue());
						editor.down('[name=acpt_qntt]').setValue(editor1.down('[name=acpt_qntt]').getValue());
						results.feedback( {success : true } );
					}
				}
			});
			if(rec.get('pdsd_yorn') != '1'){
				chk = 0;
			}
			if(rec.get('check') == 'N'){
				chk = 0;
			}
			if(rec.get('pdsd_yorn') == '1'){
				chk = 1;
			}
			if(rec.get('bcod_numb') != ''){
				chk = 1;
			}
			if(rec.get('check') == 'Y' ){
				chk = 1;
			}

			if(chk==0){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
				mask.show();
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/estimast/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: rec.get('invc_numb'),
							line_seqn	: rec.get('line_seqn'),
							amnd_degr	: rec.get('amnd_degr'),
							check		: 'prorPlan'
						})
					},
					async : false,
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							item1.select({
								callback:function(records, operation, success) {
									if (success) {
										item1.select({
											callback:function(records, operation, success) {
												if (success) {
												} else { me.pocket.editor().getForm().reset(true); }
											}, scope:me
										}, Ext.merge({
												stor_grp : _global.stor_grp,
												acpt_numb : rec.get('invc_numb'),
												acpt_seqn : rec.get('line_seqn'),
												acpt_amnd_degr : rec.get('amnd_degr')
											})
										);
										item1.getStore().each(function(findrecord){
											if(findrecord.get('indn_qntt') == 0 && Number(findrecord.get('wkfw_seqn')) > 0 ){
												findrecord.set('indn_qntt', acpt_qntt * Number(rec.get('invc_qntt')));
											}
										});
										mask.hide();
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge({
									stor_grp : _global.stor_grp,
									acpt_numb : rec.get('invc_numb'),
									acpt_seqn : rec.get('line_seqn'),
									acpt_amnd_degr : rec.get('amnd_degr')
								})
							);
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
					},
					callback : function() {
					}
				});
			}
			item1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
					stor_grp : _global.stor_grp,
					acpt_numb : rec.get('invc_numb'),
					acpt_seqn : rec.get('line_seqn'),
					acpt_amnd_degr : rec.get('amnd_degr')
				})
			);
			item2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				acpt_numb : rec.get('invc_numb'),
				acpt_seqn : rec.get('line_seqn'),
				acpt_amnd_degr : rec.get('amnd_degr')
			})
			);
			layout.getLayout().setActiveItem(2);
		}
	},

	suIt : function (rec){
		var me		= this,
		select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
		editor = Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
		editor1 = Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
		lister = Ext.ComponentQuery.query('module-estimast-worker-lister')[0],
		item1  = Ext.ComponentQuery.query('module-estimast-lister-subItem')[0],
		layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
		check = 1, chk = 0
		;
		item1.getStore().loadData([],true);


		if(editor1.down('[name=acpt_stat_dvcd]').getValue()!='0011'){
			Ext.Msg.alert("알림","승인된 수주건에만 계획을 등록할 수 있습니다.");
			check = 0;
		}
//		if(editor1.down('[name=acpt_stat_dvcd]').getValue()!='0011'){
//			Ext.Msg.alert("알림","승인 수주건에만 계획을 등록할 수 있습니다.");
//			check = 0;
//		}
		if(rec.get('drwg_numb') == null || rec.get('drwg_numb') == ''){
			Ext.Msg.alert("알림","도번을 입력하여 주십시오.");
			check = 0;
		}
		if(rec.get('item_name') == null || rec.get('item_name') == ''){
			Ext.Msg.alert("알림","품명을 입력하여 주십시오.");
			check = 0;
		}
		if(rec.get('invc_qntt') < 0 || rec.get('invc_qntt') == ''){
			Ext.Msg.alert("알림","품목수주량을 확인하여 주십시오.");
			check = 0;
		}
		if(check == 1){
			var acpt_qntt;
			editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : rec ,
				callback: function( results ) {
					if (results.success){
						editor.down('[name=cstm_name]').setValue(editor1.down('[name=cstm_name]').getValue());
						editor.down('[name=cstm_idcd]').setValue(editor1.down('[name=cstm_idcd]').getValue());
						editor.down('[name=modl_name]').setValue(editor1.down('[name=modl_name]').getValue());
						editor.down('[name=dlvy_cstm_name]').setValue(editor1.down('[name=dlvy_cstm_name]').getValue());
						editor.down('[name=invc_date]').setValue(editor1.down('[name=invc_date]').getValue());
						editor.down('[name=deli_date]').setValue(editor1.down('[name=deli_date]').getValue());
						editor.down('[name=unit_name]').setValue(editor1.down('[name=unit_name]').getValue());
						editor.down('[name=unit_idcd]').setValue(editor1.down('[name=unit_idcd]').getValue());
						editor.down('[name=user_memo]').setValue(editor1.down('[name=user_memo]').getValue());
						editor.down('[name=acpt_qntt]').setValue(editor1.down('[name=acpt_qntt]').getValue());
						results.feedback( {success : true } );
					}
				}
			});

			if(rec.get('suit_chk') == 'Y'){
				chk = 1;
			}
			if(rec.get('chk') == 'Y'){
				if(rec.get('suit_chk') != 'NEW'){
					chk = 0;
				}
			}
			if(chk==0){
			}
			item1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				acpt_numb : rec.get('invc_numb'),
				acpt_seqn : rec.get('line_seqn'),
				acpt_amnd_degr : rec.get('amnd_degr')
			})
			);
			layout.getLayout().setActiveItem(3);
		}
	},


});
