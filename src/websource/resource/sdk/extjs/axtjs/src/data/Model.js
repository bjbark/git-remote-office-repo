
Ext.define('Axt.data.Model',{ extend:'Ext.data.Model',
	fields:
	[
	 	{ name: '_set'				, type: 'string' },
		{ name: 'upt_id'			, type: 'string'  , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
		{ name: 'crt_id'			, type: 'string'  , defaultValue : _global.login_pk }  /* 데이터 생성자 명 */
    ],

    /**
     *
     * model.set메서드와 같은 기능을 하지만<br/>
     * afterEdit 이벤트를 발생 하므로 인해 속도 저하시 심함 .<br/>
     * 대량의 처리시 속도 저하로 인해서... ㄴㅇㄹㅇㄴㄹㅇㄹㅇㄹㅇtreestore에서 전체선택과같은 대량의 model.set을 할때 필요.
     */
    dirtyValue : function( fieldName , newValue ){
        var me = this,
        data = me[me.persistenceProperty],
        fields = me.fields,
        modified = me.modified,
        single = (typeof fieldName == 'string'),
        currentValue, field, idChanged, key, modifiedFieldNames, name, oldId,
        newId, value, values;

        if (single) {
        	values = me._singleProp;
        	values[fieldName] = newValue;
        } else {
        	values = fieldName;
        }

        for (name in values) {
        	if (values.hasOwnProperty(name)) {
        		value = values[name];

        		if (fields && (field = fields.get(name)) && field.convert) {
        			value = field.convert(value, me);
        		}

        		currentValue = data[name];
        		if (me.isEqual(currentValue, value)) {
        			continue;
        		}

	            data[name] = value;
	            (modifiedFieldNames || (modifiedFieldNames = [])).push(name);

	            if (field && field.persist) {
	                if (modified.hasOwnProperty(name)) {
	                    if (me.isEqual(modified[name], value)) {
	                        delete modified[name];
	                        me.dirty = false;
	                        for (key in modified) {
	                            if (modified.hasOwnProperty(key)){
	                                me.dirty = true;
	                                break;
	                            }
	                        }
	                    }
	                } else {
	                    me.dirty = true;
	                    modified[name] = currentValue;
	                }
	            }

	            if (name == me.idProperty) {
	                idChanged = true;
	                oldId = currentValue;
	                newId = value;
	            }
	        }
	    }

	    if (single) {
	        delete values[fieldName];
	    }

	    if (idChanged) {
	        me.changeId(oldId, newId);
	    }

	    return modifiedFieldNames || null;

    },


    /**
     * model.set메서드와 같은 기능을 하지만<br/>
     * afterEdit 이벤트를 발생시키지 않는다.<br/>
     * treestore에서 전체선택과같은 대량의 model.set을 할때 필요.
     */
    setNoAfterEdit: function (fieldName, newValue) {
        var me = this,
            data = me[me.persistenceProperty],
            fields = me.fields,
            modified = me.modified,
            single = (typeof fieldName == 'string'),
            currentValue, field, idChanged, key, modifiedFieldNames, name, oldId,
            newId, value, values;

        if (single) {
            values = me._singleProp;
            values[fieldName] = newValue;
        } else {
            values = fieldName;
        }

        for (name in values) {
            if (values.hasOwnProperty(name)) {
                value = values[name];

                if (fields && (field = fields.get(name)) && field.convert) {
                    value = field.convert(value, me);
                }

                currentValue = data[name];
                if (me.isEqual(currentValue, value)) {
                    continue;
                }

                data[name] = value;
                (modifiedFieldNames || (modifiedFieldNames = [])).push(name);

                if (field && field.persist) {
                    if (modified.hasOwnProperty(name)) {
                        if (me.isEqual(modified[name], value)) {
                            // The original value in me.modified equals the new value, so
                            // the field is no longer modified:
                            delete modified[name];

                            // We might have removed the last modified field, so check to
                            // see if there are any modified fields remaining and correct
                            // me.dirty:
                            me.dirty = false;
                            for (key in modified) {
                                if (modified.hasOwnProperty(key)){
                                    me.dirty = true;
                                    break;
                                }
                            }
                        }
                    } else {
                        me.dirty = true;
                        modified[name] = currentValue;
                    }
                }

                if (name == me.idProperty) {
                    idChanged = true;
                    oldId = currentValue;
                    newId = value;
                }
            }
        }

        if (single) {
            // cleanup our reused object for next time... important to do this before
            // we fire any events or call anyone else (like afterEdit)!
            delete values[fieldName];
        }

        if (idChanged) {
            me.changeId(oldId, newId);
        }


        return modifiedFieldNames || null;
    }
});