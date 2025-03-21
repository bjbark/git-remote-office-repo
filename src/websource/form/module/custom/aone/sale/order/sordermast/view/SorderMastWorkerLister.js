Ext.define('module.custom.aone.sale.order.sordermast.view.SorderMastWorkerEditorLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-aone-sordermast-worker-editorLister'			,
	store		: 'module.custom.aone.sale.order.sordermast.store.SorderMastFile',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines : true,
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
				xtype	: 'form-panel',
				dock	: 'bottom',
				itemId	: 'attachItem',
				fbar	: [
					{	xtype:'button',
						text :'삭제',
						listeners:{
							click:function(){
								var params = this.up('grid').getSelectionModel().getSelection();
								var store = this.up('grid').getStore();

								if(params.length == 0){
									Ext.Msg.error("삭제할 파일을 선택해주세요." );
								}else{
									Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
										if (button == 'yes') {
											var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
											mask.show();

											Ext.each(params,function(rec){
												Ext.Ajax.request({
													url		: _global.location.http() + '/upload/get/fileDelete.do',
													params	: {
														token : _global.token_id,
														param : JSON.stringify({
															stor_id			: _global.stor_id,
															hqof_idcd		: _global.hqof_idcd,
															file_name		: rec.get('file_name'),
															orgn_dvcd		: "acpt_mast",
															invc_numb		: rec.get('invc_numb'),
															amnd_degr		: rec.get('amnd_degr'),
															line_seqn		: rec.get('line_seqn'),
															assi_seqn		: rec.get('assi_seqn'),
															uper_seqn		: rec.get('uper_seqn'),
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
															store.reload();
														}
													},
													failure : function(result, request) {
														Ext.Msg.error(result.mesage);
													},
													callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
														mask.hide();
													}
												});
											})
										}
									});
								}
							}
						}
					}
				]

			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	xtype:'rownumberer'			, text : Language.get('seqn'			,'순번'		), width : 40 , align : 'center'
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명'	), width : 200,
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
											window.open(url,"첨부파일",'width=500px,height=400px,scrollbars=yes');
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
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시'	)	, width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'		)	, flex  : 1, minWidth : 100
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