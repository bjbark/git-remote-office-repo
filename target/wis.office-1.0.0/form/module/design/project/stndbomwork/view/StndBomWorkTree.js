Ext.define('module.design.project.stndbomwork.view.StndBomWorkTree', { extend: 'Ext.tree.Panel',
	alias		: 'widget.module-stndbomwork-tree',
	store		: 'module.design.project.stndbomwork.store.StndBomWorkTree',
	border	: 0  ,
	columnLines	: true ,// 컬럼별 라인 구분
	rootVisible	: false , // 최상위 node 숨김
	rowLines	: true,
	stripeRows	: true,
	singleExpand: false,

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
					{	text : '<span class="write-button">승인</span>'		, action : 'approveAction'	, cls: 'button-style', width: 80, hidden : !_global.auth.auth_mtrl_1002	} ,
					{	text : '<span class="write-button">승인취소</span>'	, action : 'approveCancel'	, cls: 'button-style', width: 80, hidden : !_global.auth.auth_mtrl_1002	} ,
					{	text : '<span class="write-button">BOM작성</span>'	, action : 'bomInsert'		, cls: 'button-style', width: 80, hidden : true	} ,
					'->',
					'-',
					{	text: Const.INSERT.text , iconCls: Const.INSERT.icon , itemId : 'insertBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.MODIFY.text , iconCls: Const.MODIFY.icon , itemId : 'modifyBom', handler : me.popup  ,cls: 'button-style' },
					{	text: Const.DELETE.text , iconCls: Const.DELETE.icon , handler : me.deleteBom ,cls: 'button-style' },
//					'-',
					{	xtype	: 'checkboxfield',
						checked	: false,
						name	: 'uploadChek',
						boxLabel:'삭제 후 등록',
						style	: {top:'5px',right:'10px'},
						hidden	: true
					} ,'-',
					{	text : '<span class="write-button">설계자료 업로드</span>'	, action : 'testExcel'	, cls: 'button-style', width: 100, hidden : true	} ,
				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
		item = {
				defaults	: {style: 'text-align:center', sortable: false, menuDisabled: true },
				items		: [
					{	text	: '품목 트리'	, dataIndex: 'text'	, width : 300	, xtype: 'treecolumn' ,
						renderer: function(value, metaData, record, rowIndex, colIndex, store) {
							var expmark = '';
							if (!record.data.last_modl_yn) {
							}
							return record.get('line_stat') == '1' ? '<span style="color:red;">'+ value+'</span>' : value  + '<div style="float:right;">'+expmark+'</div>' ;
						}
					},{	text : '순서'		, dataIndex: 'line_seqn'		, width :  40	, align : 'center', xtype : 'numericcolumn', hidden : true
					},{	text : 'line_clos'	, dataIndex: 'line_clos'		, width :  40	, hidden : true
					},{ text : '품목코드'	, dataIndex: 'item_idcd'		, width :  70	, hidden : false
					},{ text : '투입품명'	, dataIndex: 'item_name'		, width : 200	, hidden : true
					},{ text : '품목규격'	, dataIndex: 'item_spec'		, width : 130	, hidden : true
					},{ text : '소요량'		, dataIndex: 'need_qntt'		, width :  85	, xtype  : 'numericcolumn'
					},{	text : '등록일자'	, dataIndex: 'strt_date'		, width :  80	, hidden : true
					},{ text : '메모'		, dataIndex: 'user_memo'		, flex  : 1		, hidden : true
					},{ text : '투입공정'	, dataIndex: 'wkct_name'		, width : 100
					},{ text : '조달구분'	, dataIndex: 'supl_dvcd'		, width : 150	, xtype : 'lookupcolumn', lookupValue : resource.lookup('supl_dvcd')
					}
				]
		}
		return item;
	},
	deleteBom:function(){
		var	me		= this,
			tree	= me.up('panel'),
			select	= tree.getSelectionModel().getSelection()[0]
		;
		if(select){
			Ext.Msg.show({ title: '확인', msg: '삭제하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/design/stndbomwork/set/records.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									pjod_idcd		: select.get('pjod_idcd'),
									line_seqn		: select.get('line_seqn'),
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
										params:{param:JSON.stringify({pjod_idcd:select.get('pjod_idcd')}) }
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
		}
	},
	popup:function(){
		var	me		= this,
			tree	= me.up('panel'),
			search	= Ext.ComponentQuery.query('module-stndbomwork-search')[0],
			select	= tree.getSelectionModel().getSelection()[0],
			title,item_idcd,item_name,ivst_wkct_idcd,ivst_wkct_name,need_qntt,
			set,line_levl,line_seqn,prnt_idcd,item_spec,item_mtrl,supl_dvcd,line_ordr
			,pjod_idcd
		;

		if(select){
			pjod_idcd= select.get('pjod_idcd');
			if(me.itemId == 'insertBom'){
				title			= 'BOM 추가';
				set				= 'insert';
				line_levl		= Number(select.get('line_levl'))+Number(1);
				prnt_idcd		= select.get('item_idcd');
			}else{
				title			= 'BOM 수정';
				set				= 'update';
				prnt_idcd		= select.get('prnt_idcd');
				line_seqn		= select.get('line_seqn');
				line_ordr		= select.get('line_ordr');
				item_idcd		= select.get('item_idcd');
				item_name		= select.get('item_name');
				ivst_wkct_idcd	= select.get('ivst_wkct_idcd');
				ivst_wkct_name	= select.get('ivst_wkct_name');
				need_qntt		= select.get('need_qntt');
				supl_dvcd		= select.get('supl_dvcd');
				item_spec		= select.get('item_spec');
				item_mtrl		= select.get('item_mtrl');
			}
		}else{
			title			= 'BOM 추가';
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue();
			set			= 'insert';
			line_levl	= 1;
			prnt_idcd	= pjod_idcd;
			console.log(pjod_idcd);
			console.log(line_levl);
		}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 60,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('item_name','품목'),
						xtype		: 'popupfield',
						name		: 'item_name',
						pair		: 'item_idcd',
						labelWidth	: 60,
						width		: 220,
						clearable	: true ,
						value		: item_name,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-item-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('item_name'));
								pairField.setValue(records[0].get('item_idcd'));
								form.down('[name=item_spec]').setValue(records[0].get('item_spec'));
								form.down('[name=item_mtrl]').setValue(records[0].get('item_mtrl'));
							}
						}
					},{	xtype		: 'hiddenfield', name : 'item_idcd',value:item_idcd
					},{	xtype		: 'hiddenfield', name : 'item_spec',value:item_spec
					},{	xtype		: 'hiddenfield', name : 'item_mtrl',value:item_mtrl
					},{	fieldLabel	: Language.get('ivst_wkct_name','투입공정'),
						xtype		: 'popupfield',
						name		: 'ivst_wkct_name',
						pair		: 'ivst_wkct_idcd',
						labelWidth	: 60,
						width		: 220,
						clearable	: true ,
						value		: ivst_wkct_name,
						popup		: {
							select	: 'SINGLE',
							widget	: 'lookup-wkct-popup',
							params	: { stor_grp : _global.stor_grp , line_stat : '0' },
							result	: function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	xtype		: 'hiddenfield', name : 'ivst_wkct_idcd',value:ivst_wkct_idcd
					},{	fieldLabel	: Language.get('need_qntt','소요량'),
						xtype		: 'numericfield',
						name		: 'need_qntt',
						labelWidth	: 60,
						width		: 220,
						value		: need_qntt
					},{	fieldLabel	: Language.get('supl_dvcd','조달구분'),
						xtype		: 'lookupfield',
						name		: 'supl_dvcd',
						lookupValue	: resource.lookup('supl_dvcd'),
						labelWidth	: 60,
						width		: 220,
						value		: supl_dvcd
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
						cls: 'button-style',
						handler: function() {
							var me2 = this,
								param  = Ext.merge(this.up('form').getValues()),
								length
							;
							if(_global.hq_id.toUpperCase()=='N1000WONTC'){

								var rec;
								Ext.Ajax.request({
									url		: _global.location.http() + '/design/bomwork/get/getBomMast.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											prnt_item_idcd	: param.item_idcd
										})
									},
									async	: false,
									method	: 'POST',
									success	: function(response, request) {
										result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											length = result.records.length;
											rec    = result;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});

								if(set=='insert'){
									item_idcd		= param.item_idcd		;
									item_name		= param.item_name		;
									ivst_wkct_idcd	= param.ivst_wkct_idcd	;
									need_qntt		= param.need_qntt		;
									supl_dvcd		= param.supl_dvcd		;
									item_spec		= param.item_spec		;
									item_mtrl		= param.item_mtrl		;
									Ext.Ajax.request({
										url		: _global.location.http() + '/design/bomwork/get/getseqn.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												pjod_idcd		: pjod_idcd
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
									url		: _global.location.http() + '/design/bomwork/set/records.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											pjod_idcd		: pjod_idcd,
											line_seqn		: line_seqn,
											line_levl		: line_levl,
											line_ordr		: line_ordr,
											item_idcd		: item_idcd,
											item_name		: item_name,
											ivst_wkct_idcd	: ivst_wkct_idcd,
											need_qntt		: need_qntt,
											item_spec		: item_spec,
											item_mtrl		: item_mtrl,
											prnt_idcd		: prnt_idcd,
											supl_dvcd		: supl_dvcd,
											updt_idcd		: _global.login_pk,
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
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});

								if(length > 1){
									line_levl = line_levl + 1;
									for (var i = 0; i < length; i++) {
										Ext.Ajax.request({
											url		: _global.location.http() + '/design/bomwork/get/getseqn.do',
											params	: {
												token : _global.token_id,
												param : JSON.stringify({
													stor_id			: _global.stor_id,
													hqof_idcd		: _global.hqof_idcd,
													pjod_idcd		: pjod_idcd,
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

										Ext.Ajax.request({
											url		: _global.location.http() + '/design/bomwork/set/records.do',
											params	: {
												token : _global.token_id,
												param : JSON.stringify({
													stor_id			: _global.stor_id,
													hqof_idcd		: _global.hqof_idcd,
													pjod_idcd		: pjod_idcd,
													line_seqn		: line_seqn,
													line_levl		: line_levl,
													line_ordr		: line_ordr,
													item_idcd		: rec.records[i].item_idcd,
													item_name		: rec.records[i].item_name,
													ivst_wkct_idcd	: rec.records[i].ivst_wkct_idcd,
													need_qntt		: rec.records[i].ndqt_nmrt,
													item_spec		: rec.records[i].prnt_item_spec,
													prnt_idcd		: rec.records[i].prnt_item_idcd,
													updt_idcd		: _global.login_pk,
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
												}
											},
											failure : function(result, request) {
											},
											callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
											}
										});
									}
								}

								me2.up('window').hide();
								tree.getStore().clearData();
								tree.getStore().load({
									params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
								, scope:me,
								callback:function(records, operation, success) {
									if (success) {
										tree.getRootNode().expand();
										tree.getSelectionModel().select(0);
									} else {
									}
								}
								});
							}else{
								//원테크 이외의 회사
								if(set=='insert'){
									item_idcd		= param.item_idcd		;
									item_name		= param.item_name		;
									ivst_wkct_idcd	= param.ivst_wkct_idcd	;
									need_qntt		= param.need_qntt		;
									supl_dvcd		= param.supl_dvcd		;
									item_spec		= param.item_spec		;
									item_mtrl		= param.item_mtrl		;
									Ext.Ajax.request({
										url		: _global.location.http() + '/design/bomwork/get/getseqn.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												pjod_idcd		: pjod_idcd
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
									url		: _global.location.http() + '/design/bomwork/set/records.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											pjod_idcd		: pjod_idcd,
											line_seqn		: line_seqn,
											line_levl		: line_levl,
											line_ordr		: line_ordr,
											item_idcd		: item_idcd,
											item_name		: item_name,
											ivst_wkct_idcd	: ivst_wkct_idcd,
											need_qntt		: need_qntt,
											item_spec		: item_spec,
											item_mtrl		: item_mtrl,
											prnt_idcd		: prnt_idcd,
											supl_dvcd		: supl_dvcd,
											updt_idcd		: _global.login_pk,
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
												params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
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
					},
					{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],

			});

			win = Ext.widget('window', {
				title: title,
				closeAction: 'hide',
				width: 270,
				height: 190,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
		}
});