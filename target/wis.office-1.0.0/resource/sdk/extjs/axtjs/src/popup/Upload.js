
Ext.define('Axt.popup.Upload', { extend: 'Ext.window.Window',

    alias   : 'widget.popup-upload',

	closable: true,
	modal   : true,

    owner : undefined,
    popup : undefined,

	width : 700,
    height: 500,
    layout: {
        type: 'border'
    },
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.setKeyEvent();
		this.on('close', function() {
			var owner = me.owner;
			if (owner && owner.focus) {
				owner.focus(true, true);
			}
		});
	},

	/**
	 * 선택 된 상품분류코드 정보 설정
	 *
	 * @private
	 * @param {Ext.data.Model} records 반환값
	 */
	setResponse: function(records) {
		var me = this
		;
		if (me.popup && Ext.isFunction(me.popup.result)) {
			me.popup.result.call(this, records);
		}
		me.close();
	},


	/**
	 * 키이벤트 설정
	 *
	 * 엔터: 조회, ESC: 닫기
	 */
	/**
	 * 키이벤트 설정 엔터: 조회, ESC: 닫기
	 */
	setKeyEvent: function() {
		var me = this;

		var i = 0, searchFields = Ext.ComponentQuery.query('searchfield', me), searchField, focusDelay;
		for (; i < searchFields.length; i++) {
			searchField = searchFields[i];
			searchField.on('specialkey', function(f, e) {
				if (e.getKey() == e.ENTER) {

					var searchButton = Ext.ComponentQuery.query('button[iconCls=' + Const.SELECT.icon +']', this)[0];
					searchButton.handler.call(this);
				} else
				if (e.getKey() == e.DOWN ) {
					var grid = me.down('grid');
					if (grid.getStore().data.length > 0) {
						grid.getSelectionModel().select(0);
					}
				}

			}, this);
		}
	}

});