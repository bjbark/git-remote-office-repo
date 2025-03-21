Ext.define('module.custom.aone.item.itemlist.view.ItemListEditor', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-itemlist-editorlister'			,
	store		: 'module.custom.aone.item.itemlist.store.ItemListFile',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
	initComponent: function () {
		var me = this;
//		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},
//	pagingItem : function () {
//		var me = this,
//			item = {
//				xtype	: 'form-panel',
//				dock	: 'bottom',
//				fbar	: [
//					{	fieldLabel	: Language.get('file_name','파일첨부'),			// temp
//						xtype		: 'popupfield',
//						editable	: true,
//						enableKeyEvents : true,
//						name		: 'file',
//						pair		: 'file_name',
//						labelStyle	: 'color:white',
//						clearable	: false ,
//						popup: {
//							select : 'SINGLE',
//							widget : 'lookup-board-upload',
//							params : { stor_grp : _global.stor_grp , row_sts : '0' ,invc_numb : '' , orgn_dvcd : '',line_seqn:0},
//							result : function(records, nameField, pairField) {
//								var store = Ext.ComponentQuery.query('module-itemlist-editorlister')[0].getStore();
//								store.reload();
//							}
//						},listeners:{
//							render:function(){
//								this.popup.params.orgn_dvcd = 'item_mast';		// table name이 필요하다
//							}
//						},
//					},{	xtype:'button',
//						text :'삭제',
//						listeners:{
//							click:function(){
//								var params = this.up('grid').getSelectionModel().getSelection()[0];
//								var store = this.up('grid').getStore();
//
//								if(!params){
//									Ext.Msg.error("삭제할 파일을 선택해주세요." );
//								}else{
//									Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
//										if (button == 'yes') {
//											var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
//											mask.show();
//											Ext.Ajax.request({
//												url		: _global.location.http() + '/upload/get/fileDelete.do',
//												params	: {
//													token : _global.token_id,
//													param : JSON.stringify({
//														stor_id			: _global.stor_id,
//														hqof_idcd		: _global.hqof_idcd,
//														file_name		: params.data.file_name,
//														orgn_dvcd		: "item_mast",
//														invc_numb		: params.data.invc_numb,
//														line_seqn		: params.data.line_seqn,
//														assi_seqn		: params.data.assi_seqn
//													})
//												},
//												async	: false,
//												method	: 'POST',
//												success	: function(response, request) {
//													var result = Ext.decode(response.responseText);
//													if	(!result.success ){
//														Ext.Msg.error(result.message );
//														return;
//													} else {
//														store.reload();
//													}
//												},
//												failure : function(result, request) {
//													Ext.Msg.error(result.mesage);
//												},
//												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//													mask.hide();
//												}
//											});
//										}
//									});
//								}
//							}
//						}
//					}
//				]
//
//			};
//		return item ;
//	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)		, width : 80 , align : 'center',hidden:true
					},{	dataIndex: 'assi_seqn'		, text : Language.get('assi_seqn'		,'순번'	)		, width : 80 , align : 'center'
					},{ dataIndex: 'file_ttle'		, text : Language.get('file_ttle'		,'파일명')		, width : 120 ,hidden:true
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명')		, flex : 1 ,
						renderer:function(val,meta,record){
							var title = val;
							if(record.get('file_ttle')!='' && record.get('file_ttle')!=undefined){
								title = record.get('file_ttle');
							}
							return '<a>'+title+'</a>'
						},
						listeners:{
							click : function(view,el,pos){
								var record = view.getStore().getAt(pos);
								Ext.Ajax.request({
									url		: _global.location.http() + '/upload/set/fileDownload.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											file_name		: record.get('file_name'),
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
											var url = './resource/downloadFile/'+record.get('file_name');
											window.open(url,'down','width=1400,height=800');
										}
									},
									failure : function(result, request) {
										Ext.Msg.error(result.mesage);
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								setTimeout(function(){
									Ext.Ajax.request({
										url		: _global.location.http() + '/upload/set/localDelete.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												file_name		: record.get('file_name'),
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
												console.log(result);
											}
										},
										failure : function(result, request) {
											Ext.Msg.error(result.mesage);
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									})
								},60000);
							}
						}
					},{
						dataIndex: 'file_size'		,
						text : Language.get('file_size'		,'파일크기'),
						width : 350 ,
						renderer: function(value) {
							return Ext.String.format(numberFmt(value)+'kb')
						},
						align : 'center'
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시')	, width : 350 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, width : 150 ,
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'invc_numb')	, width : 100 , hidden:true
					}
				]
			}
		;
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return item;

	},
});