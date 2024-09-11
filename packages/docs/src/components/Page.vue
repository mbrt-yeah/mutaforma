<template>
    <article className="page">
        <header className="page__header">
            <h2 className="page__header__title">
                <slot name="title" />
            </h2>
        </header>
        <slot name="contents" />
    </article>
</template>
