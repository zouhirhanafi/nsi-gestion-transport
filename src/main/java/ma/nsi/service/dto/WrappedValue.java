package ma.nsi.service.dto;

public class WrappedValue<T> {
	private T value;

	public T getValue() {
		return value;
	}

	public void setValue(T value) {
		this.value = value;
	}
}
