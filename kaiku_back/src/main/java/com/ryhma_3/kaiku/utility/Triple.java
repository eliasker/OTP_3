package com.ryhma_3.kaiku.utility;

/**
 * @author Stack Overflow
 * @param <F>
 * @param <S>
 * @param <T>
 * https://stackoverflow.com/questions/6010843/java-how-to-store-data-triple-in-a-list
 */
public class Triple<F, S, T> {
    private final F first;
    private final S second;
    private final T third;

    public Triple(F first, S second, T third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public F getFirst() { return first; }
    public S getSecond() { return second; }
    public T getThird() { return third; }
    
    /**
     * @param toClone
     * This constructor clones another Triple
     */
    public Triple (Triple<F, S, T> toClone) {
    	this.first = (F) toClone.first;
    	this.second = (S) toClone.second;
    	this.third = (T) toClone.third;
    }
}

