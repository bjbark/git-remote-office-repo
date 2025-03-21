Ext.define('lookup.upload.CarouselPopup', { extend: 'Axt.popup.Search',
	alias: 'widget.module-upload-carouselpopup',

	title		: '이미지',
	closable	: true,
	autoShow	: true,
	width		: 900 ,
	height		: 600,
	layout		: {
		type : 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [ me.createForm()];
		me.callParent(arguments);
	},

	/**
	* 화면폼
	*/
	createForm: function() {
		var me = this,
		form = {
			xtype		: 'form-panel',
			region		: 'center',
			border		: false,
			dockedItems	: [
				{	xtype : 'toolbar',
					dock  : 'bottom',
					items : [
						'->' ,
						{ xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close,cls: 'button-style' }
					]
				}
			],
			items : [me.editorForm() ]
		};
		return form;
	},

	editorForm : function () {
		var	me	= this,
			params = me.popup.param
		;
		var store = Ext.create('Ext.data.Store', {
			fields: ['title', 'imgSrc'],
			data: []
		});
		data = [];
		Ext.Ajax.request({
			url		: _global.location.http() + '/upload/get/imagesearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					invc_numb		: params.invc_numb,
					orgn_dvcd		: params.orgn_dvcd,
					uper_seqn		: params.uper_seqn,
					file_dvcd_1fst	: params.file_dvcd_1fst,
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
					var http_url = _global.img_http;
					if(_global.hq_id.toUpperCase() == 'N1000A-ONE'){
						http_url = _global.img_http.replace("https://", "http://");
					}

					if(result.records.length > 0){
						var record = result.records,
							Img_format = "\\.(bmp|gif|jpg|jpeg|png)$"
						;

						for (var i = 0; i < record.length; i++) {
							var url = result.records[i].file_path;
							if(new RegExp(Img_format).test(url)){
								data.push({imgSrc: http_url+"/"+url})
							}
						}
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		store.loadData(data, false);

		form = {
			xtype	: 'form-panel',
			border	:  false,
			layout	: { type: 'vbox', align: 'stretch' } ,
			items	: [
				{	xtype	: 'panel',
					layout	: 'fit',
					border	: 0,
					flex	: 1,
					items	: [
						{	xtype	: 'carousel',
							name	: 'apnd_imge',
							store	: store,
							width	: 900,
							height	: 500,
							enlarge : false,
//							dbclick	: false
						}
					]
				}

			]
		};
		return form;
	},
});
