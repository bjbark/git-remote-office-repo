Ext.define('module.custom.sjflv.mtrl.po.purcordr.view.PurcOrdrListerDetail3', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-purcordr-lister-detail3',

	store: 'module.custom.sjflv.mtrl.po.purcordr.store.PurcOrdrDetail3',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' } ],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">송금영수증 등록</span>', action : 'fileAction'	, cls: 'button-style', width: 100	} ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, action : Const.DELETE.action ,cls: 'button-style' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex: 'assi_seqn'		, text: Language.get('assi_seqn'		, '순번'				), width:  40 , align : 'center'
					},{	dataIndex: 'file_name'		, text: Language.get('file_name'		, '파일명'			), width: 320,
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
//											var url = './resource/downloadFile/'+record.get('file_name');  window.open(url,'down','width=1400,height=800');
											window.open('./resource/downloadFile/'+record.get('file_name'),'download');
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
					},{	dataIndex: 'file_size'		, text: Language.get('file_size'		, '파일크기'			), width:  80,
						renderer: function(value) {
							return Ext.String.format(numberFmt(value)+'kb')
						},
					},{	dataIndex: 'upld_dttm'		, text: Language.get('upld_dttm'		, '업로드 일자'		), width: 100 , align : 'center'
					},{	dataIndex: 'remk_text'		, text: Language.get('remk_text'		, '비고'				), flex : 1, minWidth: 100
					}
				]
			};
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return item;
	}
});
