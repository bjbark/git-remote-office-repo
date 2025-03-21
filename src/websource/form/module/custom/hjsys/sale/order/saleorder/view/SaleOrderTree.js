Ext.define('module.custom.hjsys.sale.order.saleorder.view.SaleOrderTree', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-saleorder-tree',
	store		: 'module.custom.hjsys.sale.order.saleorder.store.SaleOrderTree',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,
	selModel : {
		selType: 'checkboxmodel',mode : 'MULTI'// 또는 MULTI
	},
	viewConfig	: {
		plugins: { ptype: 'treeviewdragdrop' }
	},
	initComponent: function () {
		var me = this;
		me.dockedItems  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
					'->',
					'-',
					{	text : '<span class="write-button">엑셀업로드</span>', action : 'excelUploadAction'	, cls: 'button1-style'} ,
					{	text : '<span class="write-button">작업지시서</span>', action : 'printAction'	, cls: 'button1-style'	,itemId:'treePrint'} ,
					'-',
					{	text: Const.INSERT.text , iconCls: Const.INSERT.icon , itemId : 'insertBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , itemId : 'modifyBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , handler : me.deleteBom ,cls: 'button-style' },
					{	text: Const.EXPORT.text , iconCls: Const.EXPORT.icon , action : Const.EXPORT.action ,cls: 'button-style' } , '-' ,
					{	text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action ,cls: 'button-style' },
					'-',
					{	xtype	: 'checkboxfield',
						checked	: false,
						name	: 'uploadChek',
						boxLabel:'삭제 후 등록', // 엑셀업로드시 기존것 삭제 후 등록여부
						hidden	: true,
						style	: {top:'5px',right:'10px'}
					} ,'-',
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{ dataIndex: 'row_number'		,text	: '순서'			, width :  40	, align : 'center', xtype : 'numericcolumn'
					},{  dataIndex: 'text'			,text	: '품목 트리'	, width : 250	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{ dataIndex: 'line_seqn'		, text : '순서'			, width :  40	, align : 'center', xtype : 'numericcolumn', hidden : true
					},{ dataIndex: 'line_clos'		, text : 'line_clos'	, width :  40	, hidden : true
					},{ dataIndex: 'acct_bacd'		, text : '계정구분'			, width :  70	, hidden : true
					},{ dataIndex: 'item_idcd'		, text : '품목id'			, width :  70	, hidden : true
					},{ dataIndex: 'acct_bacd_name'	, text : '계정구분'			, width :  70	, hidden : false
					},{ dataIndex: 'drwg_numb'		, text : '도면번호'			, width : 145	, hidden : false
					},{ dataIndex: 'revs_numb'		, text : 'Rev'			, width :  40	, hidden : false
					},{ dataIndex: 'mtrl_bacd_name'	, text : '재질'			, width : 100	, hidden : false
					},{ dataIndex: 'item_tick'		, text : '두께'			, width :  50	, align : 'right', hidden : false
					},{ dataIndex: 'item_code'		, text : '품목코드'			, width :  70	, hidden : true
					},{ dataIndex: 'item_name'		, text : '투입품명'			, width : 200	, hidden : true
					},{ dataIndex: 'item_spec'		, text : '규격'			, width : 130	, hidden : true
					},{ dataIndex: 'item_leng'		, text : '길이(X)'		, width : 60	, hidden : false, xtype : 'numericcolumn',
					},{ dataIndex: 'item_widh'		, text : '넓이(Y)'		, width : 60	, hidden : false, xtype : 'numericcolumn',
					},{ dataIndex: 'prnt_acct'		, text : '상위계정'			, width : 100	, hidden : true
					},{ dataIndex: 'pqty_ndqt'		, text : '소요량'			, width :  60	, xtype : 'numericcolumn',
						renderer: function(val,meta,rec) {
							if(rec.data.acct_bacd == '3000'){
								return ;
							}
							else{
//								return Ext.util.Format.number(parseFloat(val), '0,000.000');
								return Ext.util.Format.number(parseFloat(val),'0,000');
							}
						}
					},{ dataIndex: 'need_qntt'		, text : '총 소요량'			, width :  67	, xtype  : 'numericcolumn',
						renderer : function(val,meta,rec) {
//							return Ext.util.Format.number(parseFloat(val), '0,000.000');
							return Ext.util.Format.number(parseFloat(val), '0,000');
						}
					},{ dataIndex: 'strt_date'		, text : '등록일자'		, width :  80	, hidden : true
					},{ dataIndex: 'user_memo'		, text : '메모'			, flex  : 1		, hidden : true
					},{header: '도면등록',
						sortable: false,
						width:70,
						itemId : 'drwBtn',
						name:'drwBtn',
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.drwg_chek == '1'){
									Ext.defer(function() {
										Ext.widget('button', {
												renderTo: Ext.query("#"+id)[0],
												text	: '<span style="color : white !important">도면등록</span>',
												width	: 60,
												height	: 19,
												cls		: 'button-style',
												style	: 'background : #419641',
												handler	: function(){me.draw(rec)
											}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
												renderTo: Ext.query("#"+id)[0],
												text	: '<span style="color : white !important">도면등록</span>',
												width	: 60,
												height	: 19,
												cls		: 'button-style',
												handler	: function(){me.draw(rec)
											}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '생산계획',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.pror_cnt >= 1){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">계획등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(b){me.plan(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">계획등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.plan(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '원자재등록',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.mtrl_cnt1 > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">원자재등록</span>',
											width	: 63,
											height	: 19,
											style	: 'background : #419641',
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">원자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '부자재등록',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.mtrl_cnt2 > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">부자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">부자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
		}
		return item;
	},
	deleteBom:function(){
		var	me		= this,
			tree	= me.up('panel'),
			selects	= tree.getSelectionModel().getSelection()
		;
		if(selects.length>0){
			Ext.Msg.show({ title: '확인', msg: '삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						var a = [];
						for(var i =0; i< selects.length ; i++){
							a.push({invc_numb : selects[i].get('invc_numb'),line_seqn : selects[i].get('line_seqn'),item_idcd : selects[i].get('item_idcd')});
							if(selects[i].get('line_levl')==1){
								Ext.Msg.alert("알림","삭제할 수 없는 품목입니다.");
								return;
							}
						}
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/hjsys/sale/order/saleorder/set/records.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									records			: a,
									_set			: 'delete'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									tree.getStore().load({
										params:{param:JSON.stringify({invc_numb:selects[0].get('invc_numb')}) }
									, scope:me,
									callback:function(records, operation, success) {
										if (success) {
											tree.getRootNode().expand();
											tree.getSelectionModel().select(0);
										} else {
										}
									}
								});
									me2.up('window').hide();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","삭제할 품목을 하나만 선택해주세요.");
		}
	},
	popup:function(){
		var	me		= this,
			tree	= me.up('panel'),
			selects	= tree.getSelectionModel().getSelection(),
			select	= tree.getSelectionModel().getSelection()[0],
			store	= tree.getStore(),
			editor	= Ext.ComponentQuery.query('module-saleorder-worker-editor')[0],
			acpt_qntt = editor.getForm().getValues().acpt_qntt,
			selc_need = select.data.need_qntt,
			acpt_item = store.getRootNode().getChildAt(0).get('item_idcd'),
			title,item_idcd,item_name,ivst_wkct_idcd,ivst_wkct_name,need_qntt,
			set,line_levl,line_seqn,prnt_idcd,item_spec,item_mtrl,supl_dvcd,line_ordr,
			acct_bacd,acct_bacd_name,item_code, item_tick, item_leng, item_widh, mtrl_bacd, mtrl_bacd_name,
			mprq_qntt, width_p, length_p,acct_chek,item_Id,pqty_ndqt, loss_rate,drwg_numb,revs_numb,
			item_leng, item_widh,param,unit_wigt,uper_seqn,check,prev_item,dvcd
			chk = true
		;
		if(select.data.acct_bacd == '1001' || select.data.acct_bacd == '1002' || select.data.acct_bacd == '1003'){
			if(me.itemId == 'insertBom'){
				Ext.Msg.alert("알림","하위품목을 추가할 수 없는 품목입니다.");
				return;
			}
		}
		if(select.parentNode.data.id == 'root' && me.itemId != 'insertBom'){
			Ext.Msg.alert("알림","수정할 수 없는 품목입니다.");
			return;
		}
		if(selects.length==1){
			width_p = select.get('width');
			length_p = select.get('length');
			uper_seqn = select.get('line_seqn');

			if(me.itemId == 'insertBom'){
				title			= 'BOM 추가';
				set				= 'insert';
				line_levl		= select.get('line_levl')+1;
				prnt_idcd		= select.get('item_idcd');
				acct_chek		= select.get('acct_bacd');
				acpt_qntt		= acpt_qntt;
				uper_seqn		= uper_seqn;
				selc_need		= selc_need;
				item_Id			= 'insertBom';
				dvcd			= 'insert';
			}else{
					title			= 'BOM 수정';
					set				= 'update';
					prnt_idcd		= select.get('prnt_idcd');
					line_seqn		= select.get('line_seqn');
					line_ordr		= select.get('line_ordr');
					acct_bacd		= select.get('acct_bacd');
					acct_bacd_name	= select.get('acct_bacd_name');
					acct_chek		= select.get('acct_bacd');
					drwg_numb		= select.get('drwg_numb');
					revs_numb		= select.get('revs_numb');
					item_idcd		= select.get('item_idcd');
					item_name		= select.get('item_name');
					item_code		= select.get('item_code');
					mtrl_bacd		= select.get('mtrl_bacd');
					mtrl_bacd_name	= select.get('mtrl_bacd_name');
					mprq_qntt		= select.get('mprq_qntt');
					item_spec		= select.get('item_spec');
					item_leng		= select.get('item_leng');
					item_widh		= select.get('item_widh');
					item_tick		= select.get('item_tick');
					item_mtrl		= select.get('item_mtrl');
					need_qntt		= select.get('need_qntt');
					selc_need		= selc_need;
					pqty_ndqt		= select.get('pqty_ndqt');
					loss_rate		= select.get('loss_rate');
					acpt_qntt		= acpt_qntt;
					uper_seqn		= uper_seqn;
					item_Id			= 'updateBom';
					dvcd			= 'update';
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth	: 70,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	xtype : 'textfield', name : 'uper_seqn', value : uper_seqn, hidden : true
					},{ fieldLabel	: Language.get('acct_bacd_name','계정구분'),
						xtype		: 'popupfield',
						name		: 'acct_bacd_name',
						pair		: 'acct_bacd',
						itemId		: 'acct_bacd_name',
						clearable	: true,
						editable	: false,
//						readOnly	: (me.itemId=='insertBom'?'': true),
//						fieldCls	: (me.itemId=='insertBom'?'':'readonlyfield'),
						value		: (me.itemId=='insertBom'?'':acct_bacd_name),
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-base-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '1102',base_like:'반제품' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('base_name'));
								pairField.setValue(records[0].get('base_code'));
								pairField.focus(true,10);
								if(me.itemId=='insertBom'){
									form.down('[name=item_name]').popup.params={ stor_grp : _global.stor_grp , line_stat : '0', add : '1',
										acpt_item : acpt_item , find : '' , acct : records[0].get('base_code'),acct_name : records[0].get('base_name')
										, dvcd : dvcd , item_idcd:item_idcd,item_code:item_code,item_name:item_name
									};
								}else{
									form.down('[name=item_name]').popup.params={ stor_grp : _global.stor_grp , line_stat : '0', add : '1',
										acpt_item : acpt_item , find : '' , acct : acct_bacd,acct_name : acct_bacd_name
										, dvcd : dvcd , item_idcd:item_idcd,item_code:item_code,item_name:item_name
									};
								}
								setTimeout(function(){
									form.down('[name=acct_bacd]').focus(true,10);
								},100);
							}
						},
						enableKeyEvents : true,
						trigger1Cls : 'acct_bacdTrigger',
						listeners	: {
							change	: function(){
								var val = this.getValue();
								if(val == '' || val == null){
									form.getForm().reset(true);
								}
							},
							keydown : function(self, e) {
								if(e.keyCode==e.ENTER){
									var trigger1 = Ext.dom.Query.select('.acct_bacdTrigger')[0];
									Ext.get(trigger1).dom.click();
								}
							}
						}
					},{	fieldLabel	: Language.get('acct_bacd','계정구분코드'),
						xtype : 'textfield', name : 'acct_bacd', value : acct_bacd, hidden : false ,
						readOnly	: (me.itemId=='insertBom'?'': true),
						fieldCls	: (me.itemId=='insertBom'?'':'readonlyfield'),
						enableKeyEvents : true,
						listeners	: {
							change	: function (field,val,old,e){
								if(val != old){
									if(val != '' || val != null){
										if(me.itemId=='insertBom'){
											form.down('[name=item_name]').popup.params={ stor_grp : _global.stor_grp , line_stat : '0', add : '1',
												acpt_item : acpt_item , find : '' , acct : val, acct_name : form.down('[name=acct_bacd_name]').getValue()
												, dvcd : dvcd , item_idcd:item_idcd,item_code:item_code,item_name:item_name
											};
										}else{
											form.down('[name=item_name]').popup.params={ stor_grp : _global.stor_grp , line_stat : '0', add : '1',
												acpt_item : acpt_item , find : '' , acct : acct_bacd,acct_name : acct_bacd_name
												, dvcd : dvcd , item_idcd:item_idcd,item_code:item_code,item_name:item_name
											};
										}
									}
								}
							},
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									form.down('[name=item_name]').focus(true,10);
								}
							}
						}
					},{	fieldLabel	: Language.get('item','품명'),
						xtype		: 'popupfield',
						name		: 'item_name',
						pair		: 'item_idcd',
						id			: 'item',
						itemId		: 'item',
						margin		: '0 0 0 0',
						editable	: false,
						value		: item_name,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-itemcode-hj-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0', add : '1',
										acpt_item : acpt_item , find : '' ,dvcd : dvcd,acct : acct_bacd,acct_name : acct_bacd_name, item_idcd:item_idcd,item_code:item_code,item_name:item_name
							},
							result	: function(records, nameField, pairField) {
								var	tree = Ext.ComponentQuery.query('module-saleorder-tree')[0],
									record = records.values[0]
								;
								if(me.itemId=='insertBom'){
									tree.getRootNode().cascade(function(node){
										if(node.get('item_code') == record.item_code){
											Ext.Msg.alert("알림","이미 추가된 품목입니다.");
											co2unt = 0;
											return;
										}
									});
								}
								// prnt id 변경위한 체크
								if(me.itemId != 'insertBom'){
									if(record.item_idcd != item_idcd){
										form.down('[name=check]').setValue('Y');
										form.down('[name=prev_item]').setValue(item_idcd);
									}else{
										form.down('[name=check]').setValue('');
										form.down('[name=prev_item]').setValue('');
									}
								}
								nameField.setValue(record.item_name);
								pairField.setValue(record.item_idcd);
								form.down('[name=item_spec]').setValue(record.item_spec);
								form.down('[name=acct_bacd]').setValue(record.acct_bacd);
								form.down('[name=acct_bacd_name]').setValue(record.acct_bacd_name);
								form.down('[name=item_code]').setValue(record.item_code);
								form.down('[name=item_leng]').setValue(record.item_leng);
								form.down('[name=item_widh]').setValue(record.item_widh);
								form.down('[name=item_tick]').setValue(record.item_tick);
								form.down('[name=loss_rate]').setValue(0);

								if(record.acct_bacd == '1001'){
									//TODO
									form.down('[name=item_tick]').hide();
									form.down('[name=item_leng]').hide();
									form.down('[name=item_widh]').hide();
									form.down('[name=pqty_ndqt]').show();
									form.down('[name=mprq_qntt]').show();

									unit_wigt = record.unit_wigt;

									param = JSON.stringify({
										item_leng	: form.down('[name=length_p]').getValue(),
										item_widh	: form.down('[name=width_p]').getValue(),
										mtrl_spec	: record.item_spec
									});
									Ext.Ajax.request({
										url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/sale/order/saleorder/get/cal.do',
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
													var item_qntt = result.records[0].mprq_qntt; // 제품수량/장당
													var cal       = unit_wigt / item_qntt        // 원자재 소요량 계산
													total = 0;
													;
													form.down('[name=mprq_qntt]').setValue(item_qntt);
													if(!isNaN(cal)){
														total = String(cal).substring(0,String(cal).indexOf('.')+4);
													}
													form.down('[name=pqty_ndqt]').setValue(total);
													form.down('[name=need_qntt]').setValue(total);
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

								setTimeout(function(){
									form.down('[name=drwg_numb]').focus(true , 10);
								},100);
							}
						},
						enableKeyEvents : true,
						trigger1Cls : 'itemTrigger',
						listeners	: {
							change	: function (field,value,old,e){
								if(value != old){
									form.down('[name=item_idcd]').setValue('');
									form.down('[name=item_spec]').setValue('');
									form.down('[name=acct_bacd]').setValue('');
									form.down('[name=item_code]').setValue('');
									form.down('[name=drwg_numb]').setValue('');
									form.down('[name=revs_numb]').setValue('');
									form.down('[name=item_leng]').setValue(0);
									form.down('[name=item_widh]').setValue(0);
									form.down('[name=item_tick]').setValue(0);
									form.down('[name=mprq_qntt]').setValue(0);
									form.down('[name=need_qntt]').setValue(0);
									form.down('[name=pqty_ndqt]').setValue(0);
									form.down('[name=loss_rate]').setValue(0);
									form.down('[name=item_name]').popup.params.find = null;
									if(form.down('[name=item_name]') == ''){
										form.down('[name=item_name]').reset();
									}else{
										form.down('[name=item_name]').popup.params.find = this.getValue();
									}
								}else{
									form.down('[name=item_name]').popup.params.find = this.getValue();

								}

							},
							keydown : function(self, e) {
								if(e.keyCode==e.ENTER){
									var trigger1 = Ext.dom.Query.select('.itemTrigger')[0];
									Ext.get(trigger1).dom.click();
								}
							}
						}
					},{	xtype		: 'textfield'   , name : 'item_idcd',value:item_idcd, hidden : true
					},{	xtype		: 'textfield'   , name : 'prev_item', hidden : true
					},{	xtype		: 'textfield'   , name : 'check'    , hidden : true
					},{	xtype		: 'numericfield', name : 'width_p'  ,value:width_p  , hidden : true
					},{	xtype		: 'numericfield', name : 'length_p' ,value:length_p , hidden : true
					},{ fieldLabel	: Language.get('item_code','품목코드'),
						xtype		: 'textfield',
						name		: 'item_code',
						itemId		: 'item_code',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						hidden		: true,
						value		: item_code,
						margin		: '0 0 0 0',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 0 0',
						items	: [
							,{	fieldLabel	: Language.get('item_tick','두께'),
								xtype		: 'numericfield',
								name		: 'item_tick',
								hidden		: true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 120,
								value		: 0.0,
								minValue	: 0.0,
								margin		: '5 0 0 0',
								style		: 'align: center !important',
								decimalPrecision : 1,
								value		: item_tick,
								enableKeyEvents : true,
							},{	fieldLabel	: Language.get('','사이즈'),
								xtype		: 'numericfield',
								name		: 'item_leng',
								hidden		: true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								width		: 92,
								labelWidth	: 40,
								value		: 0,
								minValue	: 0,
								margin		: '5 0 0 0',
								value		: item_leng,
							},{	fieldLabel	: 'X',
								xtype		: 'numericfield',
								name		: 'item_widh',
								hidden		: true,
								readOnly	: true,
								fieldCls	: 'readonlyfield',
								labelWidth	: 15,
								width		: 67,
								margin		: '5 0 0 0',
								minValue	: 0,
								value		: item_widh,
							}
						]
					},{ fieldLabel	: Language.get('item_spec','규격'),
						xtype		: 'textfield',
						name		: 'item_spec',
						itemId		: 'item_spec',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						value		: item_spec,
						margin		: '5 0 5 0',
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('drwg_numb','도면번호'),
								xtype		: 'textfield',
								name		: 'drwg_numb',
								value		: drwg_numb,
								width		: 210,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											form.down('[name=revs_numb]').focus(true,10);
										}
									}
								}
							},{	fieldLabel	: Language.get('revs_numb','Rev'),
								xtype		: 'textfield',
								name		: 'revs_numb',
								value		: revs_numb,
								labelWidth	: 20,
								width		: 70,
								enableKeyEvents : true,
								listeners	: {
									keydown : function(self, e) {
										if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
											form.down('[name=pqty_ndqt]').focus(true,10);
										}
									}
								}
							}
						]
					},{	xtype		: 'textfield', name : 'prod_qntt', hidden : true // 수주수량
					},{	fieldLabel	: Language.get('mprq_qntt','제품수량/장당'),
						xtype		: 'numericfield',
						name		: 'mprq_qntt',
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						labelWidth	: 70,
						value		: mprq_qntt,
						enableKeyEvents : true,
						listeners	: {
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
								}
							}
						}
					},{	fieldLabel	: Language.get('pqty_ndqt','개당소요량'),
						xtype		: 'numericfield',
						name		: 'pqty_ndqt',
						value		: pqty_ndqt,
						decimalPrecision: 3,
						hidden		: false,
						minValue	: 1,
						enableKeyEvents : true,
						listeners	: {
							change	: function(){
							var val       = Number(this.getValue()),
								prod_qntt = Number(selc_need),
								acct_bacd = Number(form.down('[name=acct_bacd]').getValue()),
								value     = 0
							;
							var	tree = Ext.ComponentQuery.query('module-saleorder-tree')[0]
							;
							if(me.itemId!='insertBom'){
								tree.getRootNode().cascade(function(node){
									if(node.get('item_idcd') == prnt_idcd){
										prod_qntt = node.get('need_qntt');
										return;
									}
								});
							}
							if(prod_qntt <= 0){
								prod_qntt = 1;
							}

							console.log(editor.getForm().getValues().unit_name);

							if(editor.getForm().getValues().unit_name=="세트"){   //TODO 변경해야함 업체마다 다 달라서 code로 쳐리해야 할 수 있음.
//								value = val * (100 + (loss?loss:0)) / 100;
								value = prod_qntt * val * (100) / 100
							}else{
								value = val;
							}

							form.down('[name=need_qntt]').setValue(value);

							},
							keydown : function(self, e) {
								if (e.keyCode == e.ENTER || e.keyCode == e.TAB) {
									form.down('[name=afte_yorn]').focus(true,10);
								}
							}
						}
					},{	fieldLabel	: Language.get('loss_rate','후처리'),
						xtype		: 'lookupfield',
						name		: 'loss_rate',
						value		: loss_rate?loss_rate+"":'0'.toString(),
						lookupValue	: resource.lookup('yorn'),
//						listeners	: {
//							change	: function(){
//							var loss      = Number(this.getValue()),
//								val       = Number(form.down('[name=pqty_ndqt]').getValue());
//								prod_qntt = Number(selc_need);
//								acct_bacd = Number(form.down('[name=acct_bacd]').getValue());
//								value  = 0;
//							;
//							if(me.itemId=='modifyBom'){
//								prod_qntt = Number(select.parentNode.get('need_qntt'));
//							}
//							if(prod_qntt <= 0){
//								prod_qntt = 1;
//							}
//							if(acct_bacd == '1001'){
//								value = val * (100 + loss) / 100;
//							}else{
//								value = prod_qntt * val * (100 + loss) / 100
//							}
//
//							form.down('[name=need_qntt]').setValue(value);
								// loss율일때 쓰던것.
//							}
//						}
					},{	fieldLabel	: Language.get('need_qntt','소요량'),
						xtype		: 'numericfield',
						name		: 'need_qntt',
						value		: need_qntt,
						decimalPrecision: 3,
						readOnly	: true,
						fieldCls	: 'readonlyfield',
						labelWidth	: 70,
					}
				],
				buttons: [
					{	text : Const.FINISH.text,
						iconCls: Const.FINISH.icon,
						cls: 'button-style',
						handler: function(rec) {
							var me2 = this;
							var param = Ext.merge(this.up('form').getValues());
							if(param.item_idcd == '' || param.item_idcd == null){
								Ext.Msg.alert("알림","품목을 선택하여 주십시오.");
								return;
							}
							if(_global.hqof_idcd.toUpperCase()!='N1000HNSUN'){
								if(param.need_qntt <= 0){
									Ext.Msg.alert("알림","소요량을 확인하여 주십시오.");
									return;
								}
							}

							acct_bacd		= param.acct_bacd		;
							item_idcd		= param.item_idcd		;
							item_name		= param.item_name		;
							ivst_wkct_idcd	= param.ivst_wkct_idcd	;
							need_qntt		= param.need_qntt		;
							supl_dvcd		= param.supl_dvcd		;
							item_spec		= param.item_spec		;
							item_mtrl		= param.item_mtrl		;
							pqty_ndqt		= param.pqty_ndqt		;
							loss_rate		= param.loss_rate		;
							drwg_numb		= param.drwg_numb		;
							revs_numb		= param.revs_numb		;
							check			= param.check			;
							prev_item		= param.prev_item		;

							if(set=='insert'){
								Ext.Ajax.request({
									url		: _global.location.http() + '/custom/hjsys/sale/order/saleorder/get/getseqn.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											invc_numb		: select.get('invc_numb')
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											line_seqn = result.records[0].seq+1;
											line_ordr = result.records[0].ordr_seq+1;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
							}
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hjsys/sale/order/saleorder/set/records.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										invc_numb		: select.get('invc_numb'),
										acpt_seqn		: select.get('acpt_seqn'),
										line_seqn		: line_seqn,
										line_levl		: line_levl,
										line_ordr		: line_ordr,
										acct_bacd		: acct_bacd,
										item_idcd		: item_idcd,
										item_name		: item_name,
										ivst_wkct_idcd	: ivst_wkct_idcd,
										need_qntt		: need_qntt,
										item_spec		: item_spec,
										item_mtrl		: item_mtrl,
										prnt_idcd		: prnt_idcd,
										pqty_ndqt		: pqty_ndqt,
										loss_rate		: loss_rate,
										drwg_numb		: drwg_numb,
										revs_numb		: revs_numb,
										supl_dvcd		: supl_dvcd,
										updt_idcd		: _global.login_pk,
										uper_seqn		: uper_seqn,
										check			: check,
										prev_item		: prev_item,
										orgn_dvcd		: 'acpt_item',
										assi_seqn		: '1',
										_set			: set
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										tree.getStore().load({
											params:{param:JSON.stringify({invc_numb:select.get('invc_numb')}) }
											, scope:me,
											callback:function(records, operation, success) {
												if (success) {
													tree.getRootNode().expand();
													tree.getSelectionModel().select(0);
												} else {
												}
											}
										});
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							this.up('window').destroy();
						}
					},{	text : Const.CLOSER.text,
						iconCls: Const.CLOSER.icon ,
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').destroy();
						}
					}
				],

			});

			win = Ext.widget('window', {
				title: title,
				closeAction: 'hide',
				width: 330,
				height: 340,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide();
		}else{
			Ext.Msg.alert("알림","추가/수정하려는 품목의 상위 품목은 하나만 선택할 수 있습니다.");
		}
	},

	draw : function(rec){
		//TODO 이미지저장
		var	me = this
		;
		if(_global.hq_id.toUpperCase()=="N1000HNSUN"){
			resource.loadPopup({
				widget  : 'lookup-hjsys-saleorder-file-popup',
				params  : {
					invc_numb : rec.get('invc_numb'),
					line_seqn : rec.get('line_seqn'),
					assi_seqn : '1',
					drwg_numb : rec.get('drwg_numb'),
					revs_numb : rec.get('revs_numb'),
					drwg_chek : rec.get('drwg_chek'),
					file_nm : rec.get('file_name')
				},
				listeners: {
					close:function(){
					}
				}
			});
		}else{
			resource.loadPopup({
				widget  : 'module-saleorder-popup',
				params  : {
					invc_numb : rec.get('invc_numb'),
					line_seqn : rec.get('line_seqn'),
					assi_seqn : '1',
					drwg_numb : rec.get('drwg_numb'),
					revs_numb : rec.get('revs_numb'),
					drwg_chek : rec.get('drwg_chek'),
					file_nm : rec.get('file_name')
				},
				listeners: {
					close:function(){
					}
				}
			});
		}
	},
	plan : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-saleorder-lister-master')[0].getSelectionModel().getSelection()[0],
			master = Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			editor = Ext.ComponentQuery.query('module-saleorder-worker-editor2')[0],
			editor1 = Ext.ComponentQuery.query('module-saleorder-worker-editor')[0],
			item1  = Ext.ComponentQuery.query('module-saleorder-lister-item1')[0],
			item2  = Ext.ComponentQuery.query('module-saleorder-lister-item2')[0],
			layout = Ext.ComponentQuery.query('module-saleorder-layout')[0],
			msg = ''
		;
		if(rec){
			if(select.get('acpt_stat_dvcd') !='0011'){
				msg = "승인된 수주건에만 계획을 등록 할 수 있습니다.";
			}
			if(rec.get('acct_bacd').substr(0,1)=='1'){
				msg = "계획을 등록 할 수 있는 품목이 아닙니다.";
			}
			if(msg){
				Ext.Msg.alert('알림',msg);
				return;
			}
			var acpt_qntt;
			editor.selectRecord({ lister : master, record : select }, me);
			editor.selectRecord({ lister : master, record : rec }, me);
			item1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
					stor_grp : _global.stor_grp,
					acpt_numb : select.get('invc_numb'),
					acpt_seqn : rec.get('line_seqn'),
					acpt_amnd_degr : select.get('amnd_degr'),
					item_idcd  : rec.get('item_idcd')
				})
			);
			item2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				acpt_numb : select.get('invc_numb'),
				acpt_seqn : rec.get('line_seqn'),
				acpt_amnd_degr : select.get('amnd_degr'),
				item_idcd  : rec.get('item_idcd')
			})
			);
			layout.getLayout().setActiveItem(2);
			window.tabActive = 1;

		}
	},
	mainItem:function(rec){
		var	me = this,
			layout = Ext.ComponentQuery.query('module-saleorder-layout')[0],
			editor = Ext.ComponentQuery.query('module-saleorder-worker-editor3')[0],
			master = Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-saleorder-lister-mainItem')[0]

		;
		editor.selectRecord({ record : select }, me);
		editor.selectRecord({ record : rec }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),prnt_idcd:rec.get('item_idcd')}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(4);
		window.tabActive = 1;
	},
	subItem:function(rec){
		var	me = this,
			layout = layout = Ext.ComponentQuery.query('module-saleorder-layout')[0],
			editor = Ext.ComponentQuery.query('module-saleorder-worker-editor4')[0],
			master = Ext.ComponentQuery.query('module-saleorder-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-saleorder-lister-subItem')[0]
		;
		editor.selectRecord({ record : select }, me);
		editor.selectRecord({ record : rec }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),prnt_idcd:rec.get('item_idcd')}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(3);
		window.tabActive = 1;
	}
});