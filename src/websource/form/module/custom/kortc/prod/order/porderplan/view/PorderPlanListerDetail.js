Ext.define('module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-porderplan-lister-detail'			,
	store		: 'module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail',
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	border		: 0,
	columnLines	: true,
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
				fbar	: [

				]
			};
		return item ;
	},

	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)		, width : 90 , align : 'center'
					},{ dataIndex: 'file_ttle'		, text : Language.get('file_ttle'		,'파일명')		, width : 200 ,
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
					},{	dataIndex: 'file_size'		,
						text : Language.get('file_size'		,'파일크기'),
						width : 100 ,
						renderer: function(value) {
							return Ext.String.format(numberFmt(value)+'kb')
						},
						align : 'center'
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시')		, width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			,  flex :   1 ,
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